import { ResponseHelper } from "src/common/helpers/response.helper";
import { UsersRepository } from "../../domain/repository/users.repository";
import { ListUsersDto } from "../dto/list-users.dto";
import { IQueryBuilderPaginatedResponse } from "src/common/packages/request-broker/interfaces/query-builder-response-paginated.interface";
import { User } from "../../domain/models/user.model";
import { IResponse } from "src/common/interfaces/response.interface";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";

export class ListUsersUseCase {

    constructor(
        private readonly usersRepository: UsersRepository
    ) { }

    async exec(data: ListUsersDto): Promise<IResponse<IQueryBuilderPaginatedResponse<User>>> {
        try {
            const response = new ResponseHelper();

            const users = await this.usersRepository.list(data);
            response.result(users);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}