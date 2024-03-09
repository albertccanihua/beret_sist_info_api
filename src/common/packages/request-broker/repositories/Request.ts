import { Repository } from "typeorm";

export class Request<T> {

    private _repository: Repository<T>;
    private _alias: string;
    private _args: any;

    public get repository(): Repository<T> {
        return this._repository;
    }

    public get alias(): string {
        return this._alias;
    }

    public get args(): any {
        return this._args;
    }

    setRepository(value: Repository<T>): this {
        this._repository = value;
        return this;
    }

    setAlias(value: string): this {
        this._alias = value;
        return this;
    }

    setArgs(value: any): this {
        this._args = value;
        return this;
    }
}