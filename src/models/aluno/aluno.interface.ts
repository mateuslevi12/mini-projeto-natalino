import { Aluno } from "./aluno.entity"

export interface IAlunoRepository {
    listarAlunosDeHistoria(): Promise<Aluno[]>
    listar(): Promise<Aluno[]>
    buscarPorId(id: number): Promise<Aluno | null>
}