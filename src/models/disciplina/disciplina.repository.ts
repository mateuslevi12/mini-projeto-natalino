import { ApiService } from '../../utils/apiService.interface';
import { Aluno } from '../aluno/aluno.entity';
import { Disciplina } from './disciplina.entity';
import { IDisciplina } from './disciplina.interface';

export class DisciplinaRepository implements IDisciplina {
    
    private baseUrl: string = 'https://sswfuybfs8.execute-api.us-east-2.amazonaws.com/disciplinaServico/msDisciplina';
    private disciplinas: Disciplina[] = []
    private apiService: ApiService

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    async inicializar(): Promise<void> {
        const response = await this.apiService.get<Disciplina[]>(this.baseUrl);
        this.disciplinas = response;
    }

    async listar(): Promise<Disciplina[]> {
        return this.disciplinas.map(disciplina => new Disciplina(disciplina))
    }

    async matriculaEmHistoria(aluno: Aluno): Promise<void> {
        const alunoEstaAtivo = aluno.getStatus() == "Ativo"

        if (alunoEstaAtivo) {
            aluno.setCurso("História")
        } else {
            console.log("Não foi possivel matricular esse aluno em História pois ele não esta ativo")
        }
    }

    async buscarDisciplinasQueEstaMatriculado(aluno: Aluno): Promise<Disciplina[] | []> {
        return this.disciplinas
        .filter(disciplina => disciplina.curso === aluno.getCurso())
        .map(disciplina => new Disciplina(disciplina))
    }

    // async removerDisciplinaDaMatriculaDoAluno(aluno: Aluno, curso: string) {

    // }
}