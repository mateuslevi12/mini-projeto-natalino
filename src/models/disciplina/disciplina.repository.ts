import { Disciplina } from './disciplina.entity';
import { IDisciplinaRepository } from './disciplina.interface';

export class DisciplinaRepository implements IDisciplinaRepository {
    private disciplinas: Disciplina[]

    constructor(disciplinas: Disciplina[]) {
        this.disciplinas = disciplinas
    }
  
    async listar(): Promise<Disciplina[]> {
        return this.disciplinas.map(disciplina => new Disciplina(disciplina))
    }

}