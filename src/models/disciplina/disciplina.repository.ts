import { ApiService } from '../../utils/apiService.interface';
import { Aluno } from '../aluno/aluno.entity';
import { AlunoRepository } from '../aluno/aluno.repository';
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

            const alunos = await new AlunoRepository(this.apiService).listar()
            const index = alunos.findIndex(al => al.getId() === aluno.getId())

            if (index !== -1) {
                alunos[index] = aluno
            }
            
        } else {
            console.log("Não foi possivel matricular esse aluno em História pois ele não esta ativo")
        }
    }

    async buscarDisciplinasQueEstaMatriculado(aluno: Aluno): Promise<Disciplina[] | []> {
        return this.disciplinas
        .filter(disciplina => disciplina.curso === aluno.getCurso())
        .map(disciplina => new Disciplina(disciplina))
    }

    async removerDisciplinaDaMatricula(aluno: Aluno, nomeDaDisciplina: string): Promise<void> {
        const disciplinas = await this.buscarDisciplinasQueEstaMatriculado(aluno)
        const disciplinaEncontrada = disciplinas.find(disciplina => disciplina.nome == nomeDaDisciplina)

        if (disciplinaEncontrada) {
            const index = disciplinas.findIndex(disciplina => disciplina.id == disciplinaEncontrada.id)
            if (index !== -1) {
                disciplinas.splice(index, 1)
                console.log(`Disciplina '${nomeDaDisciplina}' removida com sucesso da matrícula do aluno.`);
            }
        } else {
            console.log(`Disciplina '${nomeDaDisciplina}' não encontrada na matrícula do aluno.`);
            return
        }
    }
}