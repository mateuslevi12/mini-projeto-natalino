import { ApiService } from '../../utils/apiService.interface';
import { Aluno } from '../aluno/aluno.entity';
import { Livro } from './livro.entity';
import { ILivro } from './livro.interface';

export class LivrosRepository implements ILivro {

    private baseUrl: string = 'https://qiiw8bgxka.execute-api.us-east-2.amazonaws.com/acervo/biblioteca';
    private livros: Livro[] = []
    public apiService: ApiService

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    async inicializar(): Promise<void> {
        const response = await this.apiService.get<Livro[]>(this.baseUrl);
        if (Array.isArray(response)) {
            this.livros = response;
        } else {
            console.error("Formato inesperado de resposta da API:", response);
        }
    }

    async listar(): Promise<Livro[]> {
        return this.livros.map(livro => new Livro(livro))
    }

    private async buscarPorNome(tituloDoLivro: string) {
        const livroEncontrado = this.livros.find(livro => livro.titulo === tituloDoLivro)
        return new Livro(livroEncontrado)
    }

    async reservar(aluno: Aluno, tituloDoLivro: string): Promise<void> {
        const alunoEstaAtivo = aluno.getStatus() === "Ativo";

        if (alunoEstaAtivo) {
            const livroEncontrado = await this.buscarPorNome(tituloDoLivro);
            if (livroEncontrado) {
                console.log(livroEncontrado);

                if (livroEncontrado.status === "Reservado") {
                    console.log("Este livro já está reservado.");
                    return;
                }

                livroEncontrado.setStatus("Reservado");

                const index = this.livros.findIndex(livro => livro.id === livroEncontrado.id);

                if (index !== -1) {
                    this.livros[index] = livroEncontrado;
                }

                console.log(livroEncontrado);
            } else {
                console.log("Livro não encontrado para reserva.");
            }
        } else {
            console.log("Não foi possível reservar esse livro pois o aluno não está ativo.");
        }
    }

    async cancelarReserva(tituloDoLivro: string): Promise<void> {
        const livroEncontrado = this.livros.find(livro => livro.titulo === tituloDoLivro);
        if (livroEncontrado) {
            livroEncontrado.setStatus(null);

            const index = this.livros.findIndex(livro => livro.id === livroEncontrado.id);

            if (index !== -1) {
                this.livros[index] = livroEncontrado;
            }
        } else {
            console.log("Livro não encontrado para cancelamento de reserva.");
        }
    }

    // async listarReservadosPeloALuno() {
    //     return this.
    // }
}