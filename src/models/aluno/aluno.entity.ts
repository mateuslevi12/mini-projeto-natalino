export class Aluno {
    protected id: number
    protected nome: string
    protected curso: string
    protected modalidade: string
    protected status: string

    constructor(data: Partial<Aluno>) {
        Object.assign(this, data)
    }

    getId() {
        return this.id
    }

    setCurso(curso: string) {
        this.curso = curso
    }

    getCurso() {
        return this.curso
    }

    getStatus() {
        return this.status
    }

    getModalidade() {
        return this.modalidade
    }

}