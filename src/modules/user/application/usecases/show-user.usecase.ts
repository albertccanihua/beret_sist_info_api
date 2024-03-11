import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { User } from "../../domain/models/user.model";
import { UsersRepository } from "../../domain/repository/users.repository";
import { ShowUserDto } from "../dto/show-user.dto";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { IResponse } from "src/common/interfaces/response.interface";
import { NotFoundException } from "@nestjs/common";

export class ShowUserUseCase {

    constructor(
        private readonly usersRepository: UsersRepository
    ) { }

    async exec(data: ShowUserDto): Promise<IResponse<User>> {
        try {
            const response = new ResponseHelper();

            const user = await this.usersRepository.show(data.id);

            if (!user) throw new NotFoundException('User not found');

            response.result(user);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

}