import { AxiosService } from '../utils/axiosService';
import { LivrosRepository } from '../models/livro/livro.repository';
import { AlunoRepository } from '../models/aluno/aluno.repository';

export class LivroController {
    private livrosRepository: LivrosRepository;
    private alunoService: AlunoRepository;

    constructor() {
        const apiService = new AxiosService();
        this.livrosRepository = new LivrosRepository(apiService);
        this.alunoService = new AlunoRepository(apiService);
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
            const aluno = await this.alunoService.buscarPorId(alunoId);
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
}
