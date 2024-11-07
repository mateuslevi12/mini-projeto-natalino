import { Aluno } from "../aluno/aluno"
import { Disciplina } from "./disciplina"

export interface IDisciplina {
    inicializar(): Promise<void>
    listar(): Promise<Disciplina[]>
    matriculaEmHistoria(aluno: Aluno): Promise<void>
    buscarDisciplinasQueEstaMatriculado(aluno: Aluno): Promise<Disciplina[] | []>
}