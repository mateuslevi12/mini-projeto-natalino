import { Aluno } from "../aluno.entity";
import { IAlunoRepository } from "../aluno.interface";

export async function listarAlunosHistoriaUseCase(alunosRepository: IAlunoRepository): Promise<Aluno[]> {
    return await alunosRepository.listarAlunosDeHistoria();
}