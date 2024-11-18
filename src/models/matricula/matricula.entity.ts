export class Matricula {
    alunoId: number;
    disciplinaId: string;

    constructor(data: Partial<Matricula>) {
        Object.assign(this, data);
    }

    getAlunoId() {
        return this.alunoId;
    }

    getDisciplinaId() {
        return this.disciplinaId;
    }
}