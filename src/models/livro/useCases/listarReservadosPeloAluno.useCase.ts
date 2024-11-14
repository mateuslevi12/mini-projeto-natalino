import { Aluno } from "../../aluno/aluno.entity";
import { Livro } from "../livro.entity";
import { ILivroRepository } from "../livro.interface";

interface IListarReservadoProps {
    aluno: Aluno
}

export async function listarReservadosPeloAlunoUseCase(livrosRespository: ILivroRepository, data: IListarReservadoProps): Promise<Livro[] | string> {
    return await livrosRespository.listarReservadosPeloAluno(data.aluno)
}