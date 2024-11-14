import { ReadlineUtil } from "../_utils/readline";
import { AlunoController } from "../controllers/aluno.controller";

export class AlunoView {
    private alunoController: AlunoController;
    private readlineUtil: ReadlineUtil;

    constructor(alunoController: AlunoController, readlineUtil: ReadlineUtil) {
        this.alunoController = alunoController
        this.readlineUtil = readlineUtil;
    }

    async inicializar() {
        await this.alunoController.inicializar();
    }

    async listarAlunosDeHistoria() {
        await this.alunoController.listarAlunosDeHistoria();
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
                return;
            }

            const aluno = await this.alunoController.buscarPorId(alunoId);

            if (aluno) {
                console.log("Aluno encontrado:", aluno);
            } else {
                console.log("Aluno não encontrado.");
            }

            return aluno;

        } catch (error) {
            console.error("Erro ao buscar aluno por ID:", error);
        }
    }

    closeReadline() {
        this.readlineUtil.close();
    }
}
