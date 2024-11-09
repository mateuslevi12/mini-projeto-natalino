import { AlunoController } from "../controllers/aluno.controller";
import promptSync from 'prompt-sync';
const prompt = promptSync();

export class AlunoView {
    private alunoController: AlunoController

    constructor() {
        this.alunoController = new AlunoController();
    }

    async initialize() {
        await this.alunoController.inicializar();
    }

    async listar() {
        return this.alunoController.listar()
    }

    async buscarPorId() {
        console.log("Diga o ID do aluno que deseja procurar")
        const alunoId = parseInt(prompt("ID: "))
        return this.alunoController.buscarPorId(alunoId)
    }
}