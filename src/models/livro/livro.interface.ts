import { Aluno } from "../aluno/aluno.entity"
import { Livro } from "./livro.entity"

export interface ILivroRepository {
    listar(): Promise<Livro[]>
    reservar(aluno: Aluno, tituloDoLivro: string): Promise<void>
    cancelarReserva(tituloDoLivro: string): Promise<void>
    listarReservadosPeloAluno(aluno: Aluno): Promise<Livro[] | string>
}