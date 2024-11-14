import { Aluno } from "../../aluno/aluno.entity";
import { ILivroRepository } from "../livro.interface";

interface IReservarLivroProps {
    aluno: Aluno,
    tituloDoLivro: string
}

export async function reservarLivro(livroRepository: ILivroRepository, data: IReservarLivroProps): Promise<void> {
    await livroRepository.reservar(data.aluno, data.tituloDoLivro)
}