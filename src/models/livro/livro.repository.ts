import { ApiService } from '../../utils/apiService.interface';
import { Aluno } from '../aluno/aluno.entity';
import { Livro } from './livro.entity';
import { ILivro } from './livro.interface';

export class LivrosRepository implements ILivro {

    private baseUrl: string = 'https://qiiw8bgxka.execute-api.us-east-2.amazonaws.com/acervo/biblioteca';
    private livros: Livro[] = []
    public apiService: ApiService

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

    async reservar(aluno: Aluno, tituloDoLivro: string): Promise<void> {
        const alunoEstaAtivo = aluno.getStatus() == "Ativo"

        if (alunoEstaAtivo) {
            const livroEncontrado = this.livros.find(livro => livro.titulo === tituloDoLivro);
            livroEncontrado.setStatus("Reservado")
        } else {
            console.log("Não foi possivel reservar esse livro pois o aluno não esta ativo")
        }
    }

    async cancelarReserva(tituloDoLivro: string): Promise<void> {
        const livro = this.livros.find(livro => livro.titulo == tituloDoLivro)
        livro.setStatus(null)
    }

    // async listarReservadosPeloALuno() {
    //     return this.
    // }
}