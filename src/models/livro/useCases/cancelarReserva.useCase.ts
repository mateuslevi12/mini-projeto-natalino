import { ILivroRepository } from '../livro.interface';

interface ICancelarReservaProps {
    tituloDoLivro: string;
}

export async function cancelarReserva(livrosRepository: ILivroRepository, data: ICancelarReservaProps): Promise<void> {
    await livrosRepository.cancelarReserva(data.tituloDoLivro)
}