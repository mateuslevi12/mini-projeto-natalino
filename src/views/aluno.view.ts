import { AlunoController } from "../controllers/aluno.controller";
import { ReadlineUtil } from "../utils/readline";

export class AlunoView {
    private alunoController: AlunoController;
    private readlineUtil: ReadlineUtil;

    constructor() {
        this.alunoController = new AlunoController();
        this.readlineUtil = new ReadlineUtil();
    }

    async initialize() {
        await this.alunoController.inicializar();
    }

    async listar() {
        await this.alunoController.listar();
    }

    private async solicitarId(): Promise<number> {
        const answer = await this.readlineUtil.question("ID: ");
        return parseInt(answer, 10);
    }

    async buscarPorId() {
        try {
            console.log("Diga o ID do aluno que deseja procurar:");
            const alunoId = await this.solicitarId();

            if (isNaN(alunoId)) {
                console.error("Entrada inválida. Por favor, digite um número.");
                this.readlineUtil.close();
                return;
            }

            const aluno = await this.alunoController.buscarPorId(alunoId);

            if (aluno) {
                console.log("Aluno encontrado:", aluno);
            } else {
                console.log("Aluno não encontrado.");
            }

            this.readlineUtil.close();
        } catch (error) {
            console.error("Erro ao buscar aluno por ID:", error);
            this.readlineUtil.close();
        }
    }
}
