import { LivroController } from "../controllers/livro.controller";
import { ReadlineUtil } from "../utils/readline";

export class LivroView {
    private livroController: LivroController;
    private readlineUtil: ReadlineUtil;

    constructor() {
        this.livroController = new LivroController();
        this.readlineUtil = new ReadlineUtil();
    }

    async initialize() {
        await this.livroController.inicializar();
    }

    async listar() {
        await this.livroController.listar();
    }
    
    async reservar() {
        const alunoId = await this.readlineUtil.question("Informe o ID do aluno que irá reservar: ");
        const tituloDoLivro = await this.readlineUtil.question("Informe o nome do livro que será reservado: ");
        await this.livroController.reservar(parseInt(alunoId, 10), tituloDoLivro);
    }
    
    async cancelarReserva() {
        const tituloDoLivro = await this.readlineUtil.question("Informe o nome do livro que terá a reserva cancelada: ");
        await this.livroController.cancelarReserva(tituloDoLivro);
    }

}
