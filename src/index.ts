import { ReadlineUtil } from "./utils/readline"
import { AlunoView } from "./views/aluno.view"
import { DisciplinaView } from "./views/disciplina.view"
import { LivroView } from "./views/livro.view"

async function iniciar() {
    const aluno = new AlunoView()
    const livro = new LivroView()
    const disciplina = new DisciplinaView()

    aluno.initialize()
    livro.initialize()
    disciplina.initialize()
}

async function main() {
    const readline = new ReadlineUtil()

    while (true) {
        const opcao = await readline.question(`Informe a opção desejada:
            \n1 - Aluno
            \n2 - Livro
            \n3 - Disciplina
            \n4 - Sair
            \n`)

        switch (parseInt(opcao)) {
            case 1:
                const escolhaAluno = await readline.question(`O que deseja ver relacionado a alunos:
                    \n1 - Listar todos os estudantes do curso de "História" na modalidade presencial.
                    \n2 - Ver detalhes de um estudante específico (pesquisa por ID ou Nome)
                    \n3 - Sair
                    \n`)
                break
            case 2:
                const escolhaDisciplina = await readline.question(`O que deseja ver relacionado a disciplinas:
                    \n1 - Permitir que um estudante com status ativo na modalidade presencial se matricule em uma disciplina de acordo com a oferta do curso de "História".
                    \n2 - Listar todas as disciplinas em que um estudante está devidamente matriculado.
                    \n3 - Remover uma disciplina da matrícula do aluno.
                    \n4 - Sair.
                    \n`)
                break
            case 3:
                const escolhaLivro = await readline.question(`O que deseja ver relacionado a livros:
                    \n1 - Permitir que um estudante com status ativo possa reservar um livro.
                    \n2 - Listar todos os livros reservados pelo estudante.
                    \n3 - Cancelar a reserva de um livro selecionado.
                    \n4 - Sair.
                    \n`)
                break
            case 4:
                readline.close()
                return
            default:
                console.log("Opção inválida. Tente novamente.")
        }
    }
}

async function rodar() {
    await iniciar()
    await main()
}

rodar()