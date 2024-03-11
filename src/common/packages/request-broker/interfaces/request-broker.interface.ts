import { QueryBuilderMethod } from "../methods/query-builder.method";

export interface IRequestBroker<T> {
    queryBuilder(alias: string): QueryBuilderMethod<T>;
}