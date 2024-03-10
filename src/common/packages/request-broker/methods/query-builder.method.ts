import { SelectQueryBuilder } from "typeorm";
import { IQueryBuilderRequest } from "../interfaces/query-builder-request.interface";
import { Request } from "../repositories/Request";
import { QueryBuilderRequestValueObject } from "../value-objects/query-builder-request.valueobject";
import { IQueryBuilderPaginatedResponse } from "../interfaces/query-builder-response-paginated.interface";

export class QueryBuilderMethod<T> extends Request<T> {

    private _query: IQueryBuilderRequest<T>;

    get query(): IQueryBuilderRequest<T> {
        return this._query;
    }

    set query(value: IQueryBuilderRequest<T>) {
        this._query = value;
    }

    create(): this {
        // Create query
        const query: IQueryBuilderRequest<T> = new QueryBuilderRequestValueObject<T>();
        query.value = this.repository.createQueryBuilder(this.alias);

        this.query = query;

        return this;
    }

    getInstance(): SelectQueryBuilder<T> {
        return this.query.value;
    }

    async getManyPaginated(page: number, limit: number): Promise<IQueryBuilderPaginatedResponse<T>> {
        const offset = (page - 1) * limit;

        const totalData = await this.query.value.getCount();
        const data = await this.query.value.offset(offset).limit(limit).getMany();

        return {
            total_data: totalData,
            total_page: data.length,
            page: page,
            data: data
        };
    }

    applyFilters(callback: (query: IQueryBuilderRequest<T>, args: any) => void): this {
        callback(this.query, this.args);
        return this;
    }

}