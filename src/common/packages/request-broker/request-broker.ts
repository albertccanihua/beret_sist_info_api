import { Repository } from "typeorm";
import { IRequestBroker } from "./interfaces/request-broker.interface";
import { QueryBuilderMethod } from "./methods/query-builder.method";

export class RequestBroker<T> implements IRequestBroker<T> {

    constructor(
        private repository: Repository<T>,
    ) { }

    queryBuilder(alias: string): QueryBuilderMethod<T> {
        return new QueryBuilderMethod<T>().setRepository(this.repository).setAlias(alias).create();
    }
}