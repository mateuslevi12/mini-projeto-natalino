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
            console.log(instanciaDoAluno.getNome().toLowerCase())
            console.log('Nome search: ',String(search).toLowerCase())
            return instanciaDoAluno.getId() == search || instanciaDoAluno.getNome().toLowerCase().includes(String(search).toLowerCase())
        });
        return aluno ? new Aluno(aluno) : undefined
    }
}