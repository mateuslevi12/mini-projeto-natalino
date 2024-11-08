import { ApiService } from "../../utils/apiService.interface";
import { Aluno } from "./aluno.entity";
import { IAluno } from "./aluno.interface";

export class AlunoRepository implements IAluno {
    
    private baseUrl: string = 'https://rmi6vdpsq8.execute-api.us-east-2.amazonaws.com/msAluno';
    private alunos: Aluno[] = [];
    private apiService: ApiService

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    async inicializar(): Promise<void> {
        const response = await this.apiService.get<Aluno[]>(this.baseUrl)
        this.alunos = response;
    }

    async listar(): Promise<Aluno[]> {
        return this.alunos.map(aluno => new Aluno(aluno));
    }

    async buscarPorId(id: number): Promise<Aluno | null> {
        const aluno = this.alunos.find((aluno) => aluno.id == id);
        return new Aluno(aluno)
    }
}