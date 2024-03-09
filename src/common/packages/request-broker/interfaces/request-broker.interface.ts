import {QueryBuilderMethod} from "../methods/query-builder.method";

export interface IRequestBroker<T> {
    queryBuilder(): QueryBuilderMethod<T>;
}