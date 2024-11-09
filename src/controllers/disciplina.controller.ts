import { AxiosService } from '../utils/axiosService';
import { AlunoRepository } from '../models/aluno/aluno.repository';
import { DisciplinaRepository } from '../models/disciplina/disciplina.repository';
import { Disciplina } from '../models/disciplina/disciplina.entity';

export class DisciplinaController {
    private disciplinaRepository: DisciplinaRepository;
    private alunosRepository: AlunoRepository;

    constructor(disciplinaRepository: DisciplinaRepository, alunosRepository: AlunoRepository) {
        this.disciplinaRepository = disciplinaRepository
        this.alunosRepository = alunosRepository
    }

    async inicializar(): Promise<void> {
        try {
           await this.disciplinaRepository.inicializar();
           console.log({ message: 'Disciplinas inicializados com sucesso.' });
        } catch (error) {
            console.log({ message: 'Erro ao inicializar disciplinas.', error });
        }
    }
    
    async listar(): Promise<void> {
        try {
            const disciplinas = await this.disciplinaRepository.listar();
            console.log(disciplinas)
        } catch (error) {
            console.log({ message: 'Erro ao listar disciplinas.', error });
        }
    }

    async buscarDisciplinasQueEstaMatriculado(alunoId: number): Promise<Disciplina[] | []> {
        try {
            const aluno = await this.alunosRepository.buscarPorId(alunoId);
            const disciplinas = await this.disciplinaRepository.buscarDisciplinasQueEstaMatriculado(aluno);
            console.log(disciplinas)
            return disciplinas
        } catch (error) {
            console.log({ message: 'Erro ao listar disciplinas.', error });
        }
    }

    async matriculaEmHistoria(alunoId: number): Promise<void> {
        try {
            const aluno = await this.alunosRepository.buscarPorId(alunoId);
            await this.disciplinaRepository.matriculaEmHistoria(aluno);
        } catch (error) {
            console.log({ message: 'Erro ao realizar matricula.', error });
        }
    }

    async removerDisciplinaDaMatricula(alunoId: number, nomeDaMatricula: string): Promise<void> {
        try {
            const aluno = await this.alunosRepository.buscarPorId(alunoId);
            await this.disciplinaRepository.removerDisciplinaDaMatricula(aluno, nomeDaMatricula);
        } catch (error) {
            console.log({ message: 'Erro ao remover disciplina.', error });
        }
    }

}
