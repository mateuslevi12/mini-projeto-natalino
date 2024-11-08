import { Livro } from '../models/livro/livro.entity';
import { AxiosService } from '../utils/axiosService';
import { Aluno } from '../models/aluno/aluno.entity';
import { LivrosRepository } from '../models/livro/livro.repository';
import { AlunoRepository } from '../models/aluno/aluno.repository';

export class LivroController {
    private livroService: LivrosRepository;
    private alunoService: AlunoRepository;

    constructor() {
        const apiService = new AxiosService();
        this.livroService = new LivrosRepository(apiService);
        this.alunoService = new AlunoRepository(apiService);
    }

    async inicializarLivros(): Promise<void> {
        try {
           await this.livroService.inicializar();
           console.log({ message: 'Livros inicializados com sucesso.' });
        } catch (error) {
            console.log({ message: 'Erro ao inicializar livros.', error });
        }
    }
    
    async inicializarAlunos(): Promise<void> {
        try {
           await this.alunoService.inicializar();
           console.log({ message: 'alunos inicializados com sucesso.' });
        } catch (error) {
            console.log({ message: 'Erro ao inicializar alunos.', error });
        }
    }

    async listarLivros(): Promise<void> {
        try {
            const livros = await this.livroService.listar();
            console.log(livros)
        } catch (error) {
            console.log({ message: 'Erro ao listar livros.', error });
        }
    }

    async reservarLivro(alunoId: number, titulo: string): Promise<void> {
        try {
            const aluno = await this.alunoService.buscarPorId(alunoId);
            console.log(aluno)
            await this.livroService.reservar(aluno, titulo);
            console.log({ message: `Livro '${titulo}' reservado com sucesso.` });
        } catch (error) {
            console.log({ message: 'Erro ao reservar livro.', error });
        }
    }

    async cancelarReserva(titulo: string): Promise<void> {
        try {
            await this.livroService.cancelarReserva(titulo);
           console.log({ message: `Reserva do livro '${titulo}' cancelada com sucesso.` });
        } catch (error) {
            console.log({ message: 'Erro ao cancelar reserva.', error });
        }
    }
}
