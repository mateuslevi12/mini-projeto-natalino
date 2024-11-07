import { Aluno } from "../aluno/aluno"
import { Livro } from "./livro"

export interface ILivro {
    inicializar(): Promise<void>
    listar(): Promise<Livro[]>
    reservar(aluno: Aluno, tituloDoLivro: string): Promise<void>
    cancelarReserva(tituloDoLivro: string): Promise<void>
}