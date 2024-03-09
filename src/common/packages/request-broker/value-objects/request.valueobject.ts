import { SelectQueryBuilder } from "typeorm";

export class RequestValueObject<T> {

    private _value: SelectQueryBuilder<T>;

    get value(): SelectQueryBuilder<T> {
        return this._value;
    }

    set value(value: SelectQueryBuilder<T>) {
        this._value = value;
    }

}