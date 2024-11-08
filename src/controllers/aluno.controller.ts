import { AxiosService } from '../utils/axiosService';
import { AlunoRepository } from '../models/aluno/aluno.repository';

export class AlunoController {
    private alunoRepository: AlunoRepository;

    constructor() {
        const apiService = new AxiosService();
        this.alunoRepository = new AlunoRepository(apiService);
    }

    async inicializar(): Promise<void> {
        try {
            await this.alunoRepository.inicializar();
            console.log({ message: 'Alunos inicializados com sucesso.' });
        } catch (error) {
            console.log({ message: 'Erro ao inicializar alunos.', error });
        }
    }

    async listar(): Promise<void> {
        try {
            const alunos = await this.alunoRepository.listar();
            console.log(alunos)
        } catch (error) {
            console.log({ message: 'Erro ao listar alunos.', error });
        }
    }

    async buscarPorId(alunoId: number): Promise<void> {
        try {
            const aluno = await this.alunoRepository.buscarPorId(alunoId);
            console.log(aluno)
        } catch (error) {
            console.log({ message: 'Erro ao listar aluno.', error });
        }
    }

}
