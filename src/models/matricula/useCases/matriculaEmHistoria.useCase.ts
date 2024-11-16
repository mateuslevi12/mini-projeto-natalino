import { Aluno } from "../../aluno/aluno.entity";
import { IMatriculaRepository } from "../matricula.interface";

interface IMatriculaEmHistoriaProps {
    aluno: Aluno
}

export async function matriculaEmHistoria(matriculaRepository: IMatriculaRepository, data: IMatriculaEmHistoriaProps): Promise<void> {
    await matriculaRepository.matriculaEmHistoria(data.aluno)
}