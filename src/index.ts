import { ReadlineUtil } from "./utils/readline";
import { AlunoView } from "./views/aluno.view";
import { DisciplinaView } from "./views/disciplina.view";
import { LivroView } from "./views/livro.view";

async function iniciar() {

}

async function main() {

    const readline = new ReadlineUtil();

    const alunoView = new AlunoView();
    const livroView = new LivroView();
    const disciplinaView = new DisciplinaView();

    await alunoView.initialize();
    await livroView.initialize();
    await disciplinaView.initialize();

    while (true) {
        const opcao = await readline.question(`Informe a opção desejada:
            \n1 - Aluno
            \n2 - Livro
            \n3 - Disciplina
            \n4 - Sair
            \n`);

        switch (parseInt(opcao)) {
            case 1:
                const escolhaAluno = await readline.question(`O que deseja ver relacionado a alunos:
                    \n1 - Listar todos os estudantes do curso de "História" na modalidade presencial.
                    \n2 - Ver detalhes de um estudante específico (pesquisa por ID ou Nome)
                    \n3 - Sair
                    \n`);

                switch (parseInt(escolhaAluno)) {
                    case 1:
                        const listaAlunos = await alunoView.listarAlunosDeHistoria();
                        console.log("Lista de alunos de História (modalidade presencial):", listaAlunos);
                        break;
                    case 2:
                        const aluno = await alunoView.buscarPorId();
                        console.log("Detalhes do aluno:", aluno);
                        break;
                    case 3:
                        break; 
                    default:
                        console.log("Opção inválida. Tente novamente.");
                }
                break;
            case 2:
                const escolhaLivro = await readline.question(`O que deseja ver relacionado a livros:
                    \n1 - Reservar um livro para um estudante.
                    \n2 - Listar todos os livros reservados pelo estudante.
                    \n3 - Cancelar a reserva de um livro.
                    \n4 - Sair
                    \n`);

                switch (parseInt(escolhaLivro)) {
                    case 1:
                        await livroView.reservar();
                        break;
                    case 2:
                        const livrosReservados = await livroView.listarReservadosPeloAluno();
                        console.log("Livros reservados:", livrosReservados);
                        break;
                    case 3:
                        await livroView.cancelarReserva();
                        break;
                    case 4:
                        break; 
                    default:
                        console.log("Opção inválida. Tente novamente.");
                }
                break;
            case 3:
                const escolhaDisciplina = await readline.question(`O que deseja ver relacionado a disciplinas:
                    \n1 - Permitir que um estudante com status ativo na modalidade presencial se matricule em uma disciplina de acordo com a oferta do curso de "História".
                    \n2 - Listar todas as disciplinas em que um estudante está matriculado.
                    \n3 - Remover uma disciplina da matrícula do aluno.
                    \n4 - Sair
                    \n`);

                switch (parseInt(escolhaDisciplina)) {
                    case 1:
                        await disciplinaView.matriculaEmHistoria();
                        break;
                    case 2:
                        const disciplinasMatriculadas = await disciplinaView.buscarDisciplinasQueEstaMatriculado();
                        console.log("Disciplinas em que o aluno está matriculado:", disciplinasMatriculadas);
                        break;
                    case 3:
                        await disciplinaView.removerDisciplinaDaMatricula();
                        break;
                    case 4:
                        break;
                    default:
                        console.log("Opção inválida. Tente novamente.");
                }
                break;
            case 4:
                readline.close();
                return;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}

async function rodar() {
    await iniciar();
    await main();
}

rodar();
