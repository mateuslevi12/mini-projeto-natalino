import { Aluno } from "../../aluno/aluno.entity";
import { MatriculaRepository } from "../matricula.repository";

interface IRemoverDisciplinaProps {
    aluno: Aluno
    nomeDaDisciplina: string;
}
export async function removerDisciplinaDaMatriculaUseCase(matriculaRepository: MatriculaRepository, data: IRemoverDisciplinaProps): Promise<void> {
    await matriculaRepository.removerDisciplinaDaMatricula(data.aluno, data.nomeDaDisciplina)
}