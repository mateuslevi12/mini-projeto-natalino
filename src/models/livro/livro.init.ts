import { ApiService } from "../../_utils/apiService.interface";
import { IInitialize } from "../../_utils/IInitialize";
import { Livro } from "./livro.entity";

export class LivroInitialize implements IInitialize<Livro> {
    private baseUrl: string = 'https://qiiw8bgxka.execute-api.us-east-2.amazonaws.com/acervo/biblioteca';
    private livros: Livro[] = []
    public apiService: ApiService

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    async inicializar(): Promise<Livro[]> {
        const response = await this.apiService.get<Livro[]>(this.baseUrl);
        this.livros = response
        return this.livros
    }

}