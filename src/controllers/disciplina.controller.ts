import { Request, Response } from 'express';
import { DisciplinaInitialize } from './../models/disciplina/disciplina.init';
import { AlunoRepository } from '../models/aluno/aluno.repository';
import { DisciplinaRepository } from '../models/disciplina/disciplina.repository';

export class DisciplinaController {
    private disciplinaRepository: DisciplinaRepository;
    // private alunosRepository: AlunoRepository;
    private disciplinaInit: DisciplinaInitialize;

    constructor(
        disciplinaRepository: DisciplinaRepository,
        //  alunosRepository: AlunoRepository,
        disciplinaInitialize: DisciplinaInitialize) {
        this.disciplinaRepository = disciplinaRepository;
        // this.alunosRepository = alunosRepository;
        this.disciplinaInit = disciplinaInitialize;
    }

    async inicializar(req: Request, res: Response): Promise<void> {
        try {
            await this.disciplinaInit.inicializar();
            res.status(200).json({ message: 'Disciplinas inicializadas com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao inicializar disciplinas.', error });
        }
    }

    async listar(req: Request, res: Response): Promise<void> {
        try {
            const disciplinas = await this.disciplinaRepository.listar();
            res.status(200).json(disciplinas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar disciplinas.', error });
        }
    }
}

// async buscarDisciplinasQueEstaMatriculado(alunoId: number): Promise<Disciplina[] | []> {
//     try {
//         const aluno = await this.alunosRepository.buscarPorId(alunoId);
//         const disciplinas = await this.disciplinaRepository.buscarDisciplinasQueEstaMatriculado(aluno);
//         console.log(disciplinas)
//         return disciplinas
//     } catch (error) {
//         console.log({ message: 'Erro ao listar disciplinas.', error });
//     }
// }

// async matriculaEmHistoria(alunoId: number): Promise<void> {
//     try {
//         const aluno = await this.alunosRepository.buscarPorId(alunoId);
//         const alunos = await this.alunosRepository.listar()
//         await this.disciplinaRepository.matriculaEmHistoria(aluno, alunos);
//     } catch (error) {
//         console.log({ message: 'Erro ao realizar matricula.', error });
//     }
// }

// async removerDisciplinaDaMatricula(alunoId: number, nomeDaMatricula: string): Promise<void> {
//     try {
//         const aluno = await this.alunosRepository.buscarPorId(alunoId);
//         await this.disciplinaRepository.removerDisciplinaDaMatricula(aluno, nomeDaMatricula);
//     } catch (error) {
//         console.log({ message: 'Erro ao remover disciplina.', error });
//     }
// }


