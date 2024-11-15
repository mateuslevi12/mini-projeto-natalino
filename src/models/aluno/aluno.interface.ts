import { Aluno } from "./aluno.entity"

export interface IAlunoRepository {
    listarAlunosDeHistoria(): Promise<Aluno[]>
    listar(): Promise<Aluno[]>
    buscarPorId(idOuNome: number | string): Promise<Aluno | null>
}