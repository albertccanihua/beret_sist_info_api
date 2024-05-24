import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { UsersRepository } from "../../domain/repository/users.repository";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { NotFoundException } from "@nestjs/common";
import { IResponse } from "src/common/interfaces/response.interface";
import * as bcrypt from 'bcrypt';

export class ChangePasswordUseCase {

    constructor(
        private readonly usersRepository: UsersRepository
    ) { }

    async exec(data: ChangePasswordDto): Promise<IResponse<boolean>> {
        try {
            const response = new ResponseHelper();

            const isPasswordUpdated = await this.usersRepository.changePassword(
                data.id,
                bcrypt.hashSync(data.password, 10)
            );

            if (isPasswordUpdated === null) throw new NotFoundException('User not found');

            response.result(isPasswordUpdated);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

}