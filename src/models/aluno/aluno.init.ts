import { ApiService } from "../../_utils/apiService.interface";
import { IInitialize } from "../../_utils/IInitialize";
import { Aluno } from "./aluno.entity";

export class AlunoInitialize implements IInitialize<Aluno> {
    private apiService: ApiService
    private baseUrl: string = 'https://rmi6vdpsq8.execute-api.us-east-2.amazonaws.com/msAluno';
    private alunos: Aluno[] = [];

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    async inicializar(): Promise<Aluno[]> {
        const response = await this.apiService.get<Aluno[]>(this.baseUrl)
        this.alunos = response.filter(aluno => new Aluno(aluno).getCurso() == 'História' && new Aluno(aluno).getStatus() == "Ativo" && new Aluno(aluno).getModalidade() == "Presencial");
        return this.alunos
    }
}