import { Aluno } from "../aluno/aluno";
import { IDisciplina } from "./disciplina.interface";

export class Disciplina implements IDisciplina {
    public id: string
    public nome: string
    public curso: string

    private baseUrl: string = 'https://sswfuybfs8.execute-api.us-east-2.amazonaws.com/disciplinaServico/msDisciplina';
    private disciplinas: Disciplina[] = []
    private apiService: ApiService

    constructor(data: Partial<Disciplina>) {
        Object.assign(this, data);
    }

    async inicializar(): Promise<void> {
        const response = await this.apiService.get<Disciplina[]>(this.baseUrl);
        this.disciplinas = response;
    }

    async listar(): Promise<Disciplina[]> {
        return this.disciplinas
    }

    async matriculaEmHistoria(aluno: Aluno): Promise<void> {
        const alunoEstaAtivo = aluno.getStatus() == "Ativo"

        if (alunoEstaAtivo) {
            aluno.setCurso("História")
        } else {
            console.log("Não foi possivel matricular esse aluno em História pois ele não esta ativo")
        }
    }

    async buscarDisciplinasQueEstaMatriculado(aluno: Aluno) {
        return this.disciplinas.filter(disciplina => disciplina.curso === aluno.getCurso())
    }

    // async removerDisciplinaDaMatriculaDoAluno(aluno: Aluno, curso: string) {

    // }
}