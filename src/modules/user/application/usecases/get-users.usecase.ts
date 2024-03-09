import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { GetUsersDto } from "../dto/get-users.dto";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { UsersRepository } from "../../domain/repository/users.repository";
import { IResponse } from "src/common/interfaces/response.interface";
import { User } from "../../domain/models/user.model";

export class GetUsersUseCase {

    constructor(
        private readonly usersRepository: UsersRepository
    ) { }

    async exec(data: GetUsersDto): Promise<IResponse<User[]>> {
        try {
            const response = new ResponseHelper();

            const users = await this.usersRepository.get(data);
            response.result(users);

            return response.resolve();
        } catch (err) {
            console.log(err);
            throw new HandleExceptionHelper(err).throw();
        }
    }
}