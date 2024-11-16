import { Aluno } from "../aluno/aluno.entity";
import { Disciplina } from "../disciplina/disciplina.entity";
import { IMatriculaRepository } from "./matricula.interface";

export class MatriculaRepository implements IMatriculaRepository {
    private disciplinas: Disciplina[]
    private alunos: Aluno[]

    constructor(disciplinas: Disciplina[], alunos: Aluno[]) {
        this.disciplinas = disciplinas
        this.alunos = alunos
    }

    async matriculaEmHistoria(aluno: Aluno): Promise<Aluno | string> {
        const alunoEstaAtivo = new Aluno(aluno).getStatus() == "Ativo"

        if (alunoEstaAtivo) {
            aluno.setCurso("História")

            console.log(aluno)
            const index = this.alunos.findIndex(al => new Aluno(al).getId() === aluno.getId())
            console.log(index)
            if (index !== -1) {
                console.log(this.alunos[index])
                this.alunos[index] = aluno
                console.log("apos mudança", this.alunos[index])
                console.log(this.alunos)
            }

            return aluno

        } else {
            throw new Error("Não foi possivel matricular esse aluno em História pois ele não esta ativo")
        }
    }

    async buscarDisciplinasQueEstaMatriculado(aluno: Aluno): Promise<{ curso: string; disciplinas: string[] }[]> {
        console.log(aluno);

        const disciplinasFiltradas = this.disciplinas
            .filter(disciplina => new Disciplina(disciplina).getCurso() === aluno.getCurso())
            .map(disciplina => new Disciplina(disciplina));

        const cursosMap = disciplinasFiltradas.reduce((acc, disciplina) => {
            const curso = disciplina.getCurso();
            if (!acc[curso]) {
                acc[curso] = [];
            }
            acc[curso].push(disciplina.getNome());
            return acc;
        }, {} as { [curso: string]: string[] });

        const resultado = Object.entries(cursosMap).map(([curso, disciplinas]) => ({
            curso,
            disciplinas,
        }));

        return resultado;
    }


    async removerDisciplinaDaMatricula(aluno: Aluno, nomeDaDisciplina: string): Promise<void> {
        const index = this.alunos.findIndex(
            al => new Aluno(al).getCurso() === nomeDaDisciplina && new Aluno(al).getId() === aluno.getId()
        );

        if (index !== -1) {
            const alunoComMatricula = this.alunos[index];

            const alunoInstancia = new Aluno(alunoComMatricula);
            alunoInstancia.setCurso(null);

            this.alunos[index] = alunoInstancia;
        } else {
            throw new Error("Aluno não possui matrícula no curso informado.");
        }
    }




}