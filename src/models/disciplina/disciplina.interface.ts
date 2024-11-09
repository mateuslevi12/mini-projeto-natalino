import { Aluno } from "../aluno/aluno.entity"
import { Disciplina } from "./disciplina.entity"

export interface IDisciplina {
    inicializar(): Promise<void>
    listar(): Promise<Disciplina[]>
    matriculaEmHistoria(aluno: Aluno): Promise<void>
    buscarDisciplinasQueEstaMatriculado(aluno: Aluno): Promise<Disciplina[] | []>
    removerDisciplinaDaMatricula(aluno: Aluno, nomeDaDisciplina: string): Promise<void>
}