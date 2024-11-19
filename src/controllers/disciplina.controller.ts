import { Request, Response } from 'express';
import { DisciplinaInitialize } from './../models/disciplina/disciplina.init';
import { AlunoRepository } from '../models/aluno/aluno.repository';
import { DisciplinaRepository } from '../models/disciplina/disciplina.repository';

export class DisciplinaController {
    private disciplinaRepository: DisciplinaRepository;
    private disciplinaInit: DisciplinaInitialize;

    constructor(
        disciplinaRepository: DisciplinaRepository,
        disciplinaInitialize: DisciplinaInitialize) {
        this.disciplinaRepository = disciplinaRepository;
        this.disciplinaInit = disciplinaInitialize;
    }

    async inicializar(req: Request, res: Response): Promise<void> {
        try {
            await this.disciplinaInit.inicializar();
            res.status(200).json({ message: 'Disciplinas inicializadas com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao inicializar disciplinas.', error });
        }
    }

    async listar(req: Request, res: Response): Promise<void> {
        try {
            const disciplinas = await this.disciplinaRepository.listar();
            res.status(200).json(disciplinas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar disciplinas.', error });
        }
    }
}


