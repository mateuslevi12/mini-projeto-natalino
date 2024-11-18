import { Aluno } from "../aluno/aluno.entity"
import { Disciplina } from "../disciplina/disciplina.entity"

export interface IMatriculaRepository {
    matriculaEmHistoria(aluno: Aluno): Promise<Aluno | string>
    buscarDisciplinasQueEstaMatriculado(aluno: Aluno): Promise<{ curso: string; disciplinas: Disciplina[] }[]>
    removerDisciplinaDaMatricula(aluno: Aluno, nomeDaDisciplina: string): Promise<void>
}