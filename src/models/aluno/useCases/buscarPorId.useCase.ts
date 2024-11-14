import { Aluno } from "../aluno.entity";
import { IAlunoRepository } from "../aluno.interface";

interface IBuscarPorIdProps {
    id: number;
}

export async function buscarPorIdUseCase(alunosRepository: IAlunoRepository, data: IBuscarPorIdProps): Promise<Aluno> {
    return await alunosRepository.buscarPorId(data.id);
}