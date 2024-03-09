import { HttpStatusConstant } from "../constants/http-status.constant";
import { IResponse } from "../interfaces/response.interface";

export class ResponseHelper<T = any> {

    private _code: number = 200;
    private _status: string = 'OK';
    private _message: string = null;
    private _result: any;

    code(value: number): this {
        this._code = value;

        if (value in HttpStatusConstant) {
            this._status = HttpStatusConstant[value].status;
        }

        return this;
    }

    status(value: string): this {
        this._status = value;
        return this;
    }

    message(value: string): this {
        this._message = value;
        return this;
    }

    result(value: any): this {
        this._result = value;
        return this;
    }

    resolve(): IResponse<T> {
        let response: IResponse = {
            code: this._code,
            status: this._status,
            result: this._result
        };

        if (this._message !== null) response['message'] = this._message;

        return response;
    }
}