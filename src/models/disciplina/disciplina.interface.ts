import { Aluno } from "../aluno/aluno.entity"
import { Disciplina } from "./disciplina.entity"

export interface IDisciplinaRepository {
    listar(): Promise<Disciplina[]>
}