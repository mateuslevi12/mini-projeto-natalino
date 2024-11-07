import { Aluno } from "./aluno"

export interface IAluno {
    inicializar(): Promise<void>
    listar(): Promise<Aluno[]>
    buscarPorId(id: string): Promise<Aluno | null>
}