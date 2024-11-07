import axios from "axios"
import { Aluno } from "../aluno/aluno"
import { ILivro } from "./livro.interface"

export class Livro implements ILivro {
    public id: string
    public titulo: string
    public autor: string
    public ano: number
    public status: string

    private baseUrl: string = 'https://qiiw8bgxka.execute-api.us-east-2.amazonaws.com/acervo/biblioteca';
    private livros: Livro[] = []
    private apiService: ApiService

    constructor(data: Partial<Livro>) {
        Object.assign(this, data);
    }

    setStatus(status: string | null) {
        this.status = status;
    }

    async inicializar(): Promise<void> {
        const response = await this.apiService.get<Livro[]>(`${this.baseUrl}`);
        this.livros = response;
    }

    async listar(): Promise<Livro[]> {
        return this.livros
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