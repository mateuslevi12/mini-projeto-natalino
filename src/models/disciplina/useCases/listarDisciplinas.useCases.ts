import { Disciplina } from "../disciplina.entity";
import { IDisciplinaRepository } from "../disciplina.interface";

export async function listarDisciplinasUseCases(disciplinaRepository: IDisciplinaRepository): Promise<Disciplina[]> {
    return await disciplinaRepository.listar()
}