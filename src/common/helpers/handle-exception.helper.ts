import { QueryFailedError, TypeORMError } from "typeorm";
import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";

export class HandleExceptionHelper {

    constructor(private readonly error: any) { }

    throw() {
        if (this.error instanceof QueryFailedError) {
            throw new BadRequestException(this.error.driverError.message);
        }

        if (this.error instanceof NotFoundException) {
            throw this.error;
        }

        if (this.error instanceof TypeORMError) {
            throw new BadRequestException(this.error.message);
        }

        throw new InternalServerErrorException();
    }
}