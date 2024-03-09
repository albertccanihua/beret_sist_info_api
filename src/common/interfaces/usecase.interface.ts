export interface IUseCase {
    exec<T = any, R = any>(data: T): Promise<R>;
}