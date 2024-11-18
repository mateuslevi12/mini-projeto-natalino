import { Aluno } from '../aluno/aluno.entity';
import { Livro } from './livro.entity';
import { ILivroRepository } from './livro.interface';

export class LivrosRepository implements ILivroRepository {

    private livros: Livro[]; 

    constructor(livros: Livro[]) {
        this.livros = livros;
    }

    async listar(): Promise<Livro[]> {
        return this.livros.map(livro => new Livro(livro))
    }

    private async buscarPorNome(tituloDoLivro: string) {
        const livroEncontrado = this.livros.find(livro => new Livro(livro).getTitulo() === tituloDoLivro)
        return new Livro(livroEncontrado)
    }

    async reservar(aluno: Aluno, tituloDoLivro: string): Promise<void> {
        const alunoEstaAtivo = aluno.getStatus() === "Ativo";

        if (alunoEstaAtivo) {
            const livroEncontrado = await this.buscarPorNome(tituloDoLivro);
            if (livroEncontrado) {

                if (livroEncontrado.getStatus() === "Reservado") {
                    throw new Error("Este livro já está reservado.")
                }

                livroEncontrado.setStatus("Reservado");
                livroEncontrado.setReservadoPor(aluno)

                const index = this.livros.findIndex(livro => new Livro(livro).getId() === livroEncontrado.getId());

                if (index !== -1) {
                    this.livros[index] = livroEncontrado;
                }
            } else {
                throw new Error("Livro não encontrado para reserva.");
            }
        } else {
            throw new Error("Não foi possível reservar esse livro pois o aluno não está ativo.");
           
        }
    }

    async cancelarReserva(tituloDoLivro: string): Promise<void> {
        const livroEncontrado = this.livros.find(livro => livro.getTitulo() === tituloDoLivro);
        if (livroEncontrado) {
            livroEncontrado.setStatus(null);
            livroEncontrado.setReservadoPor(null);
            
            const index = this.livros.findIndex(livro => livro.getId() === livroEncontrado.getId());
            
            if (index !== -1) {
                this.livros[index] = livroEncontrado;
            }
        } else {
            throw new Error("Livro não encontrado para cancelamento de reserva.");
        }
    }

    async listarReservadosPeloAluno(aluno: Aluno): Promise<Livro[] | string> {
        const reservados = this.livros.filter(livro => new Livro(livro).getReservadoPor() && new Livro(livro).getReservadoPor().getId() === aluno.getId())
        
        if (reservados.length > 0) {
            return reservados
        } else {
            return `Nenhum livro reservador por ${JSON.stringify(aluno)}`
        }
    }
}