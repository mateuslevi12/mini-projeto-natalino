import { Aluno } from "./aluno.entity";
import { IAlunoRepository } from "./aluno.interface";

export class AlunoRepository implements IAlunoRepository {
    private alunos: Aluno[]; 

    constructor(alunos: Aluno[]) {
        this.alunos = alunos;
    }

    async listarAlunosDeHistoria(): Promise<Aluno[]> {
        const lista =  this.alunos
            .map(aluno => new Aluno(aluno))
            .filter(aluno => aluno.getCurso() == "História")
        return lista
    }

    async listar(): Promise<Aluno[]> {
        return this.alunos
            .map(aluno => new Aluno(aluno))
    }

    async buscarPorId(search: number | string): Promise<Aluno | undefined> {
        console.log(search)
        const aluno = this.alunos.find((aluno) => {
            const instanciaDoAluno = new Aluno(aluno)

            return instanciaDoAluno.getId() == search || instanciaDoAluno.getNome().toLowerCase().includes(String(search).toLowerCase())
        });
        if (aluno) {
            return new Aluno(aluno)
        } else {
            throw new Error('Aluno não encontrado')
        }
    }
}