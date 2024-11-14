import { Request, Response } from 'express';
import { LivrosRepository } from '../models/livro/livro.repository';
import { AlunoRepository } from '../models/aluno/aluno.repository';
import { listarLivros } from '../models/livro/useCases/listarLivros.useCase';
import { reservarLivroUseCase } from '../models/livro/useCases/reservarLivro.useCase';
import { cancelarReservaUseCase } from '../models/livro/useCases/cancelarReserva.useCase';
import { listarReservadosPeloAlunoUseCase } from '../models/livro/useCases/listarReservadosPeloAluno.useCase';
import { AlunoInitialize } from '../models/aluno/aluno.init';
import { buscarPorIdUseCase } from '../models/aluno/useCases/buscarPorId.useCase';

export class LivroController {
    private livrosRepository: LivrosRepository;
    private alunosRepository: AlunoRepository;
    private alunoInit: AlunoInitialize;

    constructor(livrosRepository: LivrosRepository, alunosRepository: AlunoRepository, alunoInit: AlunoInitialize) {
        this.livrosRepository = livrosRepository;
        this.alunosRepository = alunosRepository;
        this.alunoInit = alunoInit;
    }

    async inicializar(req: Request, res: Response): Promise<void> {
        try {
            await this.alunoInit.inicializar();
            res.status(200).json({ message: 'Inicialização concluída com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao inicializar livros.', error });
        }
    }

    async listar(req: Request, res: Response): Promise<void> {
        try {
            const livros = await listarLivros(this.livrosRepository);
            res.status(200).json(livros);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar livros.', error });
        }
    }

    async reservar(req: Request, res: Response): Promise<void> {
        try {
            const { titulo } = req.body;
            const alunoId = parseInt(req.params.alunoId);
            const aluno = await buscarPorIdUseCase(this.alunosRepository, { id: alunoId });
            await reservarLivroUseCase(this.livrosRepository, { aluno: aluno, tituloDoLivro: titulo });
            res.status(200).json({ message: 'Livro reservado com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao reservar livro.', error });
        }
    }

    async cancelarReserva(req: Request, res: Response): Promise<void> {
        try {
            const { titulo } = req.body;
            await cancelarReservaUseCase(this.livrosRepository, { tituloDoLivro: titulo });
            res.status(200).json({ message: 'Reserva cancelada com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cancelar reserva.', error });
        }
    }

    async listarReservadosPeloAluno(req: Request, res: Response): Promise<void> {
        try {
            const alunoId = parseInt(req.params.alunoId);
            const aluno = await buscarPorIdUseCase(this.alunosRepository, { id: alunoId });
            const livrosReservados = await listarReservadosPeloAlunoUseCase(this.livrosRepository, { aluno });
            res.status(200).json(livrosReservados);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar livros reservados pelo aluno.', error });
        }
    }
}
