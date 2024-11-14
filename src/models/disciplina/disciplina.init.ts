import { ApiService } from "../../_utils/apiService.interface";
import { IInitialize } from "../../_utils/IInitialize";
import { Disciplina } from "./disciplina.entity";

export class DisciplinaInitialize implements IInitialize<Disciplina> {
    private baseUrl: string = 'https://sswfuybfs8.execute-api.us-east-2.amazonaws.com/disciplinaServico/msDisciplina';
    private disciplinas: Disciplina[] = []
    private apiService: ApiService

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    async inicializar(): Promise<Disciplina[]> {
        const response = await this.apiService.get<Disciplina[]>(this.baseUrl);
        this.disciplinas = response;
        return this.disciplinas
    }

}