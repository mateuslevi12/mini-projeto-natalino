export interface IInitialize<T> {
    inicializar(): Promise<T[]>;
}