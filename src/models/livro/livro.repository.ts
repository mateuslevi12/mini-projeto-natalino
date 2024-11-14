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
        console.log("livroEncontrado: ", livroEncontrado)
        return new Livro(livroEncontrado)
    }

    async reservar(aluno: Aluno, tituloDoLivro: string): Promise<void> {
        console.log(aluno)
        const alunoEstaAtivo = aluno.getStatus() === "Ativo";

        if (alunoEstaAtivo) {
            const livroEncontrado = await this.buscarPorNome(tituloDoLivro);
            if (livroEncontrado) {
                console.log(livroEncontrado);

                if (livroEncontrado.getStatus() === "Reservado") {
                    console.log("Este livro já está reservado.");
                    return;
                }

                livroEncontrado.setStatus("Reservado");
                livroEncontrado.setReservadoPor(aluno)

                const index = this.livros.findIndex(livro => new Livro(livro).getId() === livroEncontrado.getId());

                if (index !== -1) {
                    this.livros[index] = livroEncontrado;
                }

                console.log(livroEncontrado);
                console.log(this.livros)
            } else {
                console.log("Livro não encontrado para reserva.");
            }
        } else {
            console.log("Não foi possível reservar esse livro pois o aluno não está ativo.");
            return
        }
    }

    async cancelarReserva(tituloDoLivro: string): Promise<void> {
        const livroEncontrado = this.livros.find(livro => livro.getTitulo() === tituloDoLivro);
        if (livroEncontrado) {
            console.log(livroEncontrado)
            livroEncontrado.setStatus(null);
            livroEncontrado.setReservadoPor(null);
            
            const index = this.livros.findIndex(livro => livro.getId() === livroEncontrado.getId());
            
            console.log(livroEncontrado)
            if (index !== -1) {
                this.livros[index] = livroEncontrado;
            }
        } else {
            console.log("Livro não encontrado para cancelamento de reserva.");
        }
    }

    async listarReservadosPeloAluno(aluno: Aluno): Promise<Livro[] | string> {
        const reservados = this.livros.filter(livro => new Livro(livro).getReservadoPor() && new Livro(livro).getReservadoPor().getId() === aluno.getId())
        console.log(this.livros)
        if (reservados.length > 0) {
            return reservados
        } else {
            return `Nenhum livro reservador por ${JSON.stringify(aluno)}`
        }
    }
}