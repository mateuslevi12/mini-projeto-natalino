import { Aluno } from "../../aluno/aluno.entity";
import { Disciplina } from "../../disciplina/disciplina.entity";
import { IMatriculaRepository } from "../matricula.interface";

interface IBuscarDisciplinasProps {
    aluno: Aluno;
}

export async function buscarDisciplinasQueEstaMatriculadoUseCase(matriculaRepository: IMatriculaRepository, data: IBuscarDisciplinasProps): Promise<{ curso: string; disciplinas: Disciplina[] }[]> {
    return matriculaRepository.buscarDisciplinasQueEstaMatriculado(data.aluno)
}