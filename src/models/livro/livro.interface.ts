import { Aluno } from "../aluno/aluno.entity"
import { Livro } from "./livro.entity"

export interface ILivro {
    inicializar(): Promise<void>
    listar(): Promise<Livro[]>
    reservar(aluno: Aluno, tituloDoLivro: string): Promise<void>
    cancelarReserva(tituloDoLivro: string): Promise<void>
}