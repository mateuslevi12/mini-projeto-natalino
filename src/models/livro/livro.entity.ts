import { Aluno } from "../aluno/aluno.entity"

export class Livro {
    protected id: string
    protected titulo: string
    protected autor: string
    protected ano: number
    protected status: string
    protected reservadoPor: Aluno

    constructor(data: Partial<Livro>) {
        Object.assign(this, data);
    }

    getId() {
        return this.id;
    }

    getStatus() {
        return this.status;
    }

    getTitulo() {
        return this.titulo;
    }

    setStatus(status: string | null) {
        this.status = status;
    }

    setReservadoPor(aluno: Aluno) {
        this.reservadoPor = aluno;
    }

    getReservadoPor() {
        return this.reservadoPor;
    }

}