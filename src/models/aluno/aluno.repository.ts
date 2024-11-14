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

    async buscarPorId(id: number): Promise<Aluno> {
        console.log(this.alunos.length)
        const aluno = this.alunos.find((aluno) => new Aluno(aluno).getId() == id);
        return new Aluno(aluno)
    }
}