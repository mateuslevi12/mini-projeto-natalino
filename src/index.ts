import { LivroController } from './controllers/aluno.controller';

async function iniciar() {
    const livroController = new LivroController()
    await livroController.inicializarLivros()
    await livroController.listarLivros()
}

iniciar()