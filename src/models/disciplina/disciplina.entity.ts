export class Disciplina {
    protected id: string
    protected nome: string
    protected curso: string

    constructor(data?: Partial<Disciplina>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    getId() {
        return this.id
    }

    getNome() {
        return this.nome
    }

    getCurso() {
        return this.curso
    }

}