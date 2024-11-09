import { LivroController } from "./controllers/livro.controller"
import { AlunoView } from "./views/aluno.view"

async function iniciar() {
    const aluno = new AlunoView()
    await aluno.initialize()
    await aluno.listar()
    await aluno.buscarPorId()
    
}

iniciar()