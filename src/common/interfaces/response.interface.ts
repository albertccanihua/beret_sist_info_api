export interface IResponse<T = any> {
    code: number;
    status: string;
    message?: string;
    result: T
}