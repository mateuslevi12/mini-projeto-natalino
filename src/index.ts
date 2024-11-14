import express, { Request, Response } from 'express';
import { AlunoInitialize } from './models/aluno/aluno.init';
import { AlunoRepository } from './models/aluno/aluno.repository';
import { AlunoController } from './controllers/aluno.controller';
import { AxiosService } from './_utils/axiosService';

const app = express();
const PORT = 3000;

async function startServer() {
    const apiService = new AxiosService();
    const alunoInitialize = new AlunoInitialize(apiService);
    const alunos = await alunoInitialize.inicializar();
    const alunoRepository = new AlunoRepository(alunos);
    const alunoController = new AlunoController(alunoRepository, alunoInitialize);

    app.get('/alunos', (req: Request, res: Response) => alunoController.listarAlunosDeHistoria(req, res));
    app.get('/alunos/:id', (req: Request, res: Response) => alunoController.buscarPorId(req, res));

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

startServer().catch(error => {
    console.error('Erro ao iniciar o servidor:', error);
});
