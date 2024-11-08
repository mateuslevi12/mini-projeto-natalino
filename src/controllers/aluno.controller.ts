import { Livro } from '../models/livro/livro.entity';
import { AxiosService } from '../utils/axiosService';
import { Aluno } from '../models/aluno/aluno.entity';

export class LivroController {
    private livroService: Livro;

    constructor() {
        const apiService = new AxiosService();
        this.livroService = new Livro({apiService});
    }

    async inicializarLivros(): Promise<void> {
        try {
           await this.livroService.inicializar();
           console.log({ message: 'Livros inicializados com sucesso.' });
        } catch (error) {
            console.log({ message: 'Erro ao inicializar livros.', error });
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

    async reservarLivro(alunoId: string, titulo: string): Promise<void> {
        try {
            const aluno = new Aluno({ id: alunoId }); // Simula a obtenção do aluno; ajuste conforme necessário
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
