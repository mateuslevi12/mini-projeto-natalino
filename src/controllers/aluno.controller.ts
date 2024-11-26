import { Request, Response } from 'express';
import { AlunoRepository } from '../models/aluno/aluno.repository';
import { listarAlunosHistoriaUseCase } from '../models/aluno/useCases/listarAlunosHistoria.useCase';
import { buscarPorIdUseCase } from '../models/aluno/useCases/buscarPorId.useCase';
import { AlunoInitialize } from '../models/aluno/aluno.init';

export class AlunoController {
    private alunoRepository: AlunoRepository;
    private alunoInit: AlunoInitialize;

    constructor(alunoRepository: AlunoRepository, alunoInit: AlunoInitialize) {
        this.alunoRepository = alunoRepository;
        this.alunoInit = alunoInit;
    }

    async inicializar(req: Request, res: Response): Promise<void> {
        try {
            await this.alunoInit.inicializar();
            res.status(200).json({ message: 'Alunos inicializados com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao inicializar alunos.', error });
        }
    }

    async listarAlunosDeHistoria(req: Request, res: Response): Promise<void> {
        try {
            const alunos = await listarAlunosHistoriaUseCase(this.alunoRepository);
            res.status(200).json(alunos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar alunos.', error });
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const alunoIdOrNome = req.params.id;

            const aluno = await buscarPorIdUseCase(this.alunoRepository, { idOuNome: alunoIdOrNome })

            res.status(200).json(aluno);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar aluno.', error });
        }
    }

}
