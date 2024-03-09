import { IQueryBuilderRequest } from "../interfaces/query-builder-request.interface";
import { RequestValueObject } from "./request.valueobject";

export class QueryBuilderRequestValueObject<T> extends RequestValueObject<T> implements IQueryBuilderRequest<T> { }