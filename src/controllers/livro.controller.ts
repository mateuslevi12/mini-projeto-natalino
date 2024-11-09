import { AxiosService } from '../utils/axiosService';
import { LivrosRepository } from '../models/livro/livro.repository';
import { AlunoRepository } from '../models/aluno/aluno.repository';

export class LivroController {
    private livrosRepository: LivrosRepository;
    private alunosRepository: AlunoRepository;

    constructor(livrosRepository: LivrosRepository, alunosRepository: AlunoRepository) {
        this.livrosRepository = livrosRepository
        this.alunosRepository = alunosRepository
    }

    async inicializar(): Promise<void> {
        try {
            await this.livrosRepository.inicializar();
            console.log({ message: 'Livros inicializados com sucesso.' });
        } catch (error) {
            console.log({ message: 'Erro ao inicializar livros.', error });
        }
    }

    async listar(): Promise<void> {
        try {
            const livros = await this.livrosRepository.listar();
            console.log(livros)
        } catch (error) {
            console.log({ message: 'Erro ao listar livros.', error });
        }
    }

    async reservar(alunoId: number, titulo: string): Promise<void> {
        try {
            const aluno = await this.alunosRepository.buscarPorId(alunoId);
            console.log(aluno)
            await this.livrosRepository.reservar(aluno, titulo);
            console.log({ message: `Livro '${titulo}' reservado com sucesso.` });
        } catch (error) {
            console.log({ message: 'Erro ao reservar livro.', error });
        }
    }

    async cancelarReserva(titulo: string): Promise<void> {
        try {
            await this.livrosRepository.cancelarReserva(titulo);
            console.log({ message: `Reserva do livro '${titulo}' cancelada com sucesso.` });
        } catch (error) {
            console.log({ message: 'Erro ao cancelar reserva.', error });
        }
    }

    async listarReservadosPeloAluno(alunoId: number): Promise<void> {
        try {
            const aluno = await this.alunosRepository.buscarPorId(alunoId);
            console.log(aluno)
            await this.livrosRepository.listarReservadosPeloAluno(aluno);
        } catch (error) {
            console.log({ message: 'Erro ao listar livros reservados.', error });
        }
    }
}
