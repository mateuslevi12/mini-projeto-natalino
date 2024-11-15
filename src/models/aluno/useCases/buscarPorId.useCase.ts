import { Aluno } from "../aluno.entity";
import { IAlunoRepository } from "../aluno.interface";

interface IBuscarPorIdProps {
    idOuNome: number | string;
}

export async function buscarPorIdUseCase(alunosRepository: IAlunoRepository, data: IBuscarPorIdProps): Promise<Aluno> {
    return await alunosRepository.buscarPorId(data.idOuNome);
}