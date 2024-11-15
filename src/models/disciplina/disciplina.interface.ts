import { Disciplina } from "./disciplina.entity"

export interface IDisciplinaRepository {
    listar(): Promise<Disciplina[]>
}