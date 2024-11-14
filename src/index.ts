import { LivroController } from './controllers/livro.controller';
import { LivroInitialize } from './models/livro/livro.init';
import express, { Request, Response } from 'express';
import { AlunoInitialize } from './models/aluno/aluno.init';
import { AlunoRepository } from './models/aluno/aluno.repository';
import { AlunoController } from './controllers/aluno.controller';
import { AxiosService } from './_utils/axiosService';
import { LivrosRepository } from './models/livro/livro.repository';

const app = express();
const PORT = 3000;
app.use(express.json());

async function startServer() {
  const apiService = new AxiosService();
  const alunoInitialize = new AlunoInitialize(apiService);
  const livroInitialize = new LivroInitialize(apiService);
  
  const alunos = await alunoInitialize.inicializar();
  const livros = await livroInitialize.inicializar();

  const alunoRepository = new AlunoRepository(alunos);
  const alunoController = new AlunoController(alunoRepository, alunoInitialize);

  const livroRepository = new LivrosRepository(livros)
  const livroController = new LivroController(livroRepository, alunoRepository, livroInitialize)

  app.get('/alunos', (req: Request, res: Response) => alunoController.listarAlunosDeHistoria(req, res));
  app.get('/alunos/:id', (req: Request, res: Response) => alunoController.buscarPorId(req, res));

  app.get('/livros',(req: Request, res: Response) => livroController.listar(req, res))
  app.get('/livros/reservados/:alunoId',(req: Request, res: Response) => livroController.listarReservadosPeloAluno(req, res))
  app.post('/livros/reservar/:alunoId',(req: Request, res: Response) => livroController.reservar(req, res))
  app.put('/livros/cancelar-reserva/:titulo',(req: Request, res: Response) => livroController.cancelarReserva(req, res))


  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer().catch(error => {
  console.error('Erro ao iniciar o servidor:', error);
});
