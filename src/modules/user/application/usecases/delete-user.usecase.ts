import { IResponse } from "src/common/interfaces/response.interface";
import { UsersRepository } from "../../domain/repository/users.repository";
import { DeleteUserDto } from "../dto/delete-user.dto";
import { User } from "../../domain/models/user.model";
import { ResponseHelper } from "src/common/helpers/response.helper";

export class DeleteUserUseCase {

    constructor(
        private readonly usersRepository: UsersRepository
    ) { }

    async exec(data: DeleteUserDto): Promise<IResponse<User>> {
        try {
            const response = new ResponseHelper();

            const user = await this.usersRepository.delete(data.id);

            response.result(user);

            return response.resolve();
        } catch (err) {
            console.log(err);
        }
    }
}