import { LivroController } from './controllers/livro.controller';
import { LivroInitialize } from './models/livro/livro.init';
import express, { Request, Response } from 'express';
import { AlunoInitialize } from './models/aluno/aluno.init';
import { AlunoRepository } from './models/aluno/aluno.repository';
import { AlunoController } from './controllers/aluno.controller';
import { AxiosService } from './_utils/axiosService';
import { LivrosRepository } from './models/livro/livro.repository';
import cors from 'cors'
import { DisciplinaInitialize } from './models/disciplina/disciplina.init';
import { DisciplinaController } from './controllers/disciplina.controller';
import { DisciplinaRepository } from './models/disciplina/disciplina.repository';
import { MatriculaRepository } from './models/matricula/matricula.repository';
import { MatriculaController } from './controllers/matricula.controller';

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());


async function startServer() {
  const apiService = new AxiosService();
  const alunoInitialize = new AlunoInitialize(apiService);
  const livroInitialize = new LivroInitialize(apiService);
  const disciplinaInitialize = new DisciplinaInitialize(apiService)
  
  const alunos = await alunoInitialize.inicializar();
  const livros = await livroInitialize.inicializar();
  const disciplinas = await disciplinaInitialize.inicializar();

  const alunoRepository = new AlunoRepository(alunos);
  const alunoController = new AlunoController(alunoRepository, alunoInitialize);
 
  const livroRepository = new LivrosRepository(livros)
  const livroController = new LivroController(livroRepository, alunoRepository, livroInitialize)

  const disciplinaRepository = new DisciplinaRepository(disciplinas)
  const disciplinaController = new DisciplinaController(disciplinaRepository, disciplinaInitialize)

  const matriculaRepository = new MatriculaRepository(disciplinas, alunos)
  const matriculaController = new MatriculaController(matriculaRepository, alunoRepository)
  
  app.get('/alunos', (req: Request, res: Response) => alunoController.listarAlunosDeHistoria(req, res));
  app.get('/alunos/:id', (req: Request, res: Response) => alunoController.buscarPorId(req, res));

  app.get('/livros',(req: Request, res: Response) => livroController.listar(req, res))
  app.get('/livros/reservados/:alunoId',(req: Request, res: Response) => livroController.listarReservadosPeloAluno(req, res))
  app.post('/livros/reservar/:alunoId',(req: Request, res: Response) => livroController.reservar(req, res))
  app.put('/livros/cancelar-reserva/:titulo',(req: Request, res: Response) => livroController.cancelarReserva(req, res))

  app.get('/disciplinas', (req: Request, res: Response) => disciplinaController.listar(req, res));

  app.post('/matricula/historia/:alunoId', (req: Request, res: Response) => matriculaController.matricularEmHistoria(req, res));
  app.get('/matricula/buscar-disciplinas/:alunoId', (req: Request, res: Response) => matriculaController.listarDisciplinasMatriculadas(req, res));
  app.put('/matricula/remover-matricula/:alunoId', (req: Request, res: Response) => matriculaController.removerDisciplinaDaMatricula(req, res));

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer().catch(error => {
  console.error('Erro ao iniciar o servidor:', error);
});
