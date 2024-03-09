import {SelectQueryBuilder} from "typeorm";

export interface IQueryBuilderRequest<T> {
    value: SelectQueryBuilder<T>;
}