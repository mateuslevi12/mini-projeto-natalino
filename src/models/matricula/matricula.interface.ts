import { Aluno } from "../aluno/aluno.entity"
import { Disciplina } from "../disciplina/disciplina.entity"

export interface IMatriculaRepository {
    matriculaEmHistoria(aluno: Aluno, alunos: Aluno[]): Promise<void>
    buscarDisciplinasQueEstaMatriculado(aluno: Aluno): Promise<Disciplina[] | []>
    removerDisciplinaDaMatricula(aluno: Aluno, nomeDaDisciplina: string): Promise<void>
}