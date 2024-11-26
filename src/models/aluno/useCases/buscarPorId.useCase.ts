import { Aluno } from "../aluno.entity";
import { IAlunoRepository } from "../aluno.interface";

interface IBuscarPorIdProps {
    idOuNome: number | string;
}

export async function buscarPorIdUseCase(alunosRepository: IAlunoRepository, data: IBuscarPorIdProps): Promise<Aluno> {
    const idOuNomeFormatado =
        typeof data.idOuNome === "string" && isNaN(Number(data.idOuNome))
            ? data.idOuNome.toLowerCase()
            : parseInt(data.idOuNome as string);

    const aluno = await alunosRepository.buscarPorId(idOuNomeFormatado);

    if (!aluno) {
        throw new Error("Aluno não encontrado");
    }

    return aluno;
}
