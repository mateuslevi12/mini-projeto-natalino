import { Livro } from "../livro.entity";
import { ILivroRepository } from "../livro.interface";

export async function listarLivros(livroRepository: ILivroRepository): Promise<Livro[]> {
    return await livroRepository.listar();
}