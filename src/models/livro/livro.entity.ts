export class Livro {
    public id: string
    public titulo: string
    public autor: string
    public ano: number
    public status: string

    constructor(data: Partial<Livro>) {
        Object.assign(this, data);
    }

    setStatus(status: string | null) {
        this.status = status;
    }

}