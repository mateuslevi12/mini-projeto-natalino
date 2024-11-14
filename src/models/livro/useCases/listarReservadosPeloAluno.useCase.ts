import { Aluno } from "../../aluno/aluno.entity";
import { Livro } from "../livro.entity";
import { ILivroRepository } from "../livro.interface";

interface IListarReservadoProps {
    aluno: Aluno
}

export async function listarReservadosPeloAluno(livrosRespository: ILivroRepository, data: IListarReservadoProps): Promise<void> {
    await livrosRespository.listarReservadosPeloAluno(data.aluno)
}