import { DisciplinaController } from "../controllers/disciplina.controller";
import { ReadlineUtil } from "../utils/readline";

export class DisciplinaView {
    private disciplinaController: DisciplinaController;
    private readlineUtil: ReadlineUtil;

    constructor(disciplinaController: DisciplinaController, readlineUtil: ReadlineUtil) {
        this.disciplinaController = disciplinaController
        this.readlineUtil = readlineUtil
    }

    async inicializar() {
        await this.disciplinaController.inicializar();
    }

    async listar() {
        await this.disciplinaController.listar();
    }

    async buscarDisciplinasQueEstaMatriculado() {
        const alunoId = await this.readlineUtil.question("Informe o ID do aluno que deseja ver as disciplinas: ");
        await this.disciplinaController.buscarDisciplinasQueEstaMatriculado(parseInt(alunoId, 10));
    }

    async matriculaEmHistoria() {
        const alunoId = await this.readlineUtil.question("Informe o ID do aluno que deseja matricular em história: ");
        await this.disciplinaController.matriculaEmHistoria(parseInt(alunoId, 10));
    }

    async removerDisciplinaDaMatricula() {
        const alunoId = await this.readlineUtil.question("Informe o ID do aluno que deseja remover uma disciplina: ");
        const nomeDaDisciplina = await this.readlineUtil.question("Informe o nome da disciplina: ");
        await this.disciplinaController.removerDisciplinaDaMatricula(parseInt(alunoId, 10), nomeDaDisciplina);
    }

}
