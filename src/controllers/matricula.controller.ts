import { Request, Response } from "express";
import { MatriculaRepository } from "../models/matricula/matricula.repository";
import { AlunoRepository } from "../models/aluno/aluno.repository";
import { buscarPorIdUseCase } from "../models/aluno/useCases/buscarPorId.useCase";
import { removerDisciplinaDaMatriculaUseCase } from "../models/matricula/useCases/removerDisciplinaDaMatricula.useCase";

export class MatriculaController {
    private matriculaRepository: MatriculaRepository
    private alunosRepository: AlunoRepository;

    constructor(matriculaRepository: MatriculaRepository, alunosRepository: AlunoRepository) {
        this.matriculaRepository = matriculaRepository;
        this.alunosRepository = alunosRepository;
    }

    async matricularEmHistoria(req: Request, res: Response) {
        const { alunoId } = req.params;
        const aluno = isNaN(Number(alunoId))
            ? await buscarPorIdUseCase(this.alunosRepository, { idOuNome: alunoId?.toLowerCase() })
            : await buscarPorIdUseCase(this.alunosRepository, { idOuNome: parseInt(alunoId) });

        const response = await this.matriculaRepository.matriculaEmHistoria(aluno);
        res.status(200).json(response);
    }

    async listarDisciplinasMatriculadas(req: Request, res: Response) {
        try {
            const { alunoId } = req.params;
            const aluno = isNaN(Number(alunoId))
                ? await buscarPorIdUseCase(this.alunosRepository, { idOuNome: alunoId?.toLowerCase() })
                : await buscarPorIdUseCase(this.alunosRepository, { idOuNome: parseInt(alunoId) });
            const disciplinas = await this.matriculaRepository.buscarDisciplinasQueEstaMatriculado(aluno);
            res.status(200).json(disciplinas);
        } catch (error) {
            console.error("Erro ao listar disciplinas matriculadas:", error);

            if (error instanceof Error && error.message === "Aluno não encontrado") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Erro interno ao listar disciplinas matriculadas." });
            }
        }
    }

    async removerDisciplinaDaMatricula(req: Request, res: Response) {
        try {
            const { alunoId } = req.params;
            const { nomeDaDisciplina } = req.body;
            const aluno = isNaN(Number(alunoId))
                ? await buscarPorIdUseCase(this.alunosRepository, { idOuNome: alunoId?.toLowerCase() })
                : await buscarPorIdUseCase(this.alunosRepository, { idOuNome: parseInt(alunoId) });

                console.log(aluno)

            await removerDisciplinaDaMatriculaUseCase(this.matriculaRepository, {
                aluno,
                nomeDaDisciplina
            })

            res.status(200).json({ message: "Disciplina removida com sucesso." });

        } catch (error) {
            if (error instanceof Error && error.message === "Aluno não encontrado") {
                res.status(404).json({ message: error.message });
            } else {
                console.log(error)
                res.status(500).json({ message: "Erro interno ao remover disciplina da matricula." });
            }
        }
    }
}