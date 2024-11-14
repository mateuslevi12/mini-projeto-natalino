import { Aluno } from "../aluno.entity";
import { IAlunoRepository } from "../aluno.interface";

export async function buscarPorId(alunosRepository: IAlunoRepository, id: number): Promise<Aluno> {
    return await alunosRepository.buscarPorId(id);
}