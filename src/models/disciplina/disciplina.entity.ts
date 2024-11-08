export class Disciplina {
    public id: string
    public nome: string
    public curso: string

    constructor(data: Partial<Disciplina>) {
        Object.assign(this, data);
    }

}