export class Matricula {
    protected alunoId: string;
    protected disciplinaId: string;

    constructor(alunoId: string, disciplinaId: string) {
        this.alunoId = alunoId;
        this.disciplinaId = disciplinaId;
    }

    getAlunoId() {
        return this.alunoId;
    }

    getDisciplinaId() {
        return this.disciplinaId;
    }
}