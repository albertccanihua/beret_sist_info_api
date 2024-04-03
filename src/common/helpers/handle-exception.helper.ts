import { QueryFailedError, TypeORMError } from "typeorm";
import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";

export class HandleExceptionHelper {

    constructor(private readonly error: any) { }

    throw() {
        if (this.error instanceof QueryFailedError) {
            if (this.error.driverError.errno === 1052, this.error.driverError.sqlState === '23000') {
                throw new BadRequestException(this.error.driverError.message);

            }
            
            if (this.error.driverError.errno === 1062, this.error.driverError.sqlState === '23000') {
                const item = this.error.driverError.message.split(' ')[2];
                throw new BadRequestException('El registro ' + item + ' ya existe en el sistema');
            }

            if (this.error.driverError.errno === 1052, this.error.driverError.sqlState === '23000') {
                throw new BadRequestException(this.error.driverError.message);

            }

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