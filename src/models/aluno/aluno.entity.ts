export class Aluno {
    public id: string
    public nome: string
    public curso: string
    public modalidade: string
    public status: string

    constructor(data: Partial<Aluno>) {
        Object.assign(this, data)
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


}