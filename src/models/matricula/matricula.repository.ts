import { AxiosError } from "axios";
import { Aluno } from "../aluno/aluno.entity";
import { Disciplina } from "../disciplina/disciplina.entity";
import { Matricula } from "./matricula.entity";
import { IMatriculaRepository } from "./matricula.interface";

export class MatriculaRepository implements IMatriculaRepository {
    private disciplinas: Disciplina[]
    private alunos: Aluno[]
    private matriculas: Matricula[] = []

    constructor(disciplinas: Disciplina[], alunos: Aluno[]) {
        this.disciplinas = disciplinas
        this.alunos = alunos
    }

    async matriculaEmHistoria(aluno: Aluno): Promise<Aluno | string> {
        const alunoEstaAtivo = new Aluno(aluno).getStatus() == "Ativo"

        if (alunoEstaAtivo) {
            aluno.setCurso("História")

            const index = this.alunos.findIndex(al => new Aluno(al).getId() === aluno.getId())
            
            if (index !== -1) {
                this.alunos[index] = aluno
                const matricula = new Matricula({ alunoId: aluno.getId(), disciplinaId: 'História' });
                this.matriculas.push(matricula)
            }

            return aluno

        } else {
            throw new AxiosError("Não foi possivel matricular esse aluno em História pois ele não esta ativo")
        }
    }

    
    async buscarDisciplinasQueEstaMatriculado(aluno: Aluno): Promise<{ curso: string; disciplinas: Disciplina[] }[]> {
        const alunoId = new Aluno(aluno).getId();

        const disciplinasIds = this.matriculas
            .filter(matricula => new Matricula(matricula).getAlunoId() === alunoId)
            .map(matricula => new Matricula(matricula).getDisciplinaId());

        const disciplinasFiltradas = this.disciplinas.filter(disciplina =>
            disciplinasIds.includes(new Disciplina(disciplina).getCurso())
        );

        const disciplinasAgrupadasPorCurso = disciplinasFiltradas.reduce((acc, disciplina) => {
            const curso = new Disciplina(disciplina).getCurso();
            if (!acc[curso]) {
                acc[curso] = [];
            }
            acc[curso].push(disciplina);
            return acc;
        }, {} as Record<string, Disciplina[]>);

        const resultadoAgrupado = Object.entries(disciplinasAgrupadasPorCurso).map(([curso, disciplinas]) => ({
            curso,
            disciplinas,
        }));

        return resultadoAgrupado;
    }

    async removerDisciplinaDaMatricula(aluno: Aluno, nomeDaDisciplina: string): Promise<void> {
        const indexMatricula = this.matriculas.findIndex(
            matricula => matricula.alunoId == new Aluno(aluno).getId() && matricula.disciplinaId == "História"
        );
    
        if (indexMatricula !== -1) {
            this.matriculas.splice(indexMatricula, 1);
    
            const alunoIndex = this.alunos.findIndex(a => new Aluno(a).getId() === aluno.getId());
    
            if (alunoIndex !== -1) {
                const alunoInstancia = new Aluno(this.alunos[alunoIndex]);
                alunoInstancia.setCurso(null);
                this.alunos[alunoIndex] = alunoInstancia;
            } else {
                console.error("Aluno não encontrado no array `alunos`.");
            }
            
        } else {
            throw new AxiosError("Aluno não possui matrícula na disciplina informada.");
        }
    }
    

}