export class Aluno {
    public id: string
    public nome: string
    public curso: string
    public modalidade: string
    public status: string
    
    private baseUrl: string = 'https://rmi6vdpsq8.execute-api.us-east-2.amazonaws.com/msAluno';
    private alunos: Aluno[] = [];
    private apiService: ApiService

    setCurso(curso: string) {
        this.curso = curso
    }

    getCurso() {
        return this.curso
    }

    getStatus() {
        return this.status
    }

    constructor(data: Partial<Aluno>) {
        Object.assign(this, data)
    }

    async inicializar(): Promise<void> {
        const response = await this.apiService.get<Aluno[]>(this.baseUrl)
        this.alunos = response;
    }

    async listar(): Promise<Aluno[]> {
        return this.alunos;
    }

    async buscarPorId(id: string): Promise<Aluno | null> {
        const aluno = this.alunos.find((aluno) => aluno.id === id);
        return aluno
    }
}