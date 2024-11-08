import { LivroController } from "./controllers/livro.controller"

async function iniciar() {
    const livroController = new LivroController()
    await livroController.inicializarLivros()
    await livroController.inicializarAlunos()
    await livroController.reservarLivro(2, 'Orgulho e Preconceito')
}

iniciar()