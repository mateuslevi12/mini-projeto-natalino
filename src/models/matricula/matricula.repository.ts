import { Aluno } from "../aluno/aluno.entity";
import { Disciplina } from "../disciplina/disciplina.entity";
import { IMatriculaRepository } from "./matricula.interface";

export class MatriculaRepository implements IMatriculaRepository {
    private disciplinas: Disciplina[]

    constructor(disciplinas: Disciplina[]) {
        this.disciplinas = disciplinas
    }
    
    async matriculaEmHistoria(aluno: Aluno, alunos: Aluno[]): Promise<void> {
        const alunoEstaAtivo = aluno.getStatus() == "Ativo"

        if (alunoEstaAtivo) {
            aluno.setCurso("História")

            console.log(aluno)
            const index = alunos.findIndex(al => new Aluno(al).getId() === aluno.getId())
            console.log(index)
            if (index !== -1) {
                console.log(alunos[index])
                alunos[index] = aluno
                console.log("apos mudança",alunos[index])
                console.log(alunos)
            }
            
        } else {
            console.log("Não foi possivel matricular esse aluno em História pois ele não esta ativo")
        }
    }

    async buscarDisciplinasQueEstaMatriculado(aluno: Aluno): Promise<Disciplina[]> {
        console.log(aluno)
        return this.disciplinas
        .filter(disciplina => new Disciplina(disciplina).getCurso() === aluno.getCurso())
        .map(disciplina => new Disciplina(disciplina))
    }   

    async removerDisciplinaDaMatricula(aluno: Aluno, nomeDaDisciplina: string): Promise<void> {

        const disciplinas = await this.buscarDisciplinasQueEstaMatriculado(aluno)
        console.log(disciplinas)
        const disciplinaEncontrada = disciplinas.find(disciplina => disciplina.getNome() == nomeDaDisciplina)

        if (disciplinaEncontrada) {
            const index = disciplinas.findIndex(disciplina => disciplina.getId() == disciplinaEncontrada.getId())
            if (index !== -1) {
                disciplinas.splice(index, 1)
                console.log(`Disciplina '${nomeDaDisciplina}' removida com sucesso da matrícula do aluno.`);
            }
        } else {
            console.log(`Disciplina '${nomeDaDisciplina}' não encontrada na matrícula do aluno.`);
            return
        }
    }
}