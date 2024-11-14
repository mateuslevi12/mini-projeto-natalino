import { ILivroRepository } from '../livro.interface';

interface ICancelarReservaProps {
    tituloDoLivro: string;
}

export async function cancelarReservaUseCase(livrosRepository: ILivroRepository, data: ICancelarReservaProps): Promise<void> {
    await livrosRepository.cancelarReserva(data.tituloDoLivro)
}