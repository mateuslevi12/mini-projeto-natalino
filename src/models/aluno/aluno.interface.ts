import { Aluno } from "./aluno.entity"

export interface IAluno {
    inicializar(): Promise<void>
    listarAlunosDeHistoria(): Promise<Aluno[]>
    listar(): Promise<Aluno[]>
    buscarPorId(id: number): Promise<Aluno | null>
}