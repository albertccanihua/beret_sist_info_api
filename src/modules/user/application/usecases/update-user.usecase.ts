import { ResponseHelper } from "src/common/helpers/response.helper";
import { User } from "../../domain/models/user.model";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UsersRepository } from "../../domain/repository/users.repository";
import * as bcrypt from 'bcrypt';
import { IResponse } from "src/common/interfaces/response.interface";

export class UpdateUserUseCase {

    constructor(
        private readonly usersRepository: UsersRepository
    ) { }

    async exec(data: UpdateUserDto): Promise<IResponse<User>> {
        try {
            const response = new ResponseHelper();

            const user = await this.usersRepository.update(data.id, {
                document_type: data.document_type,
                document_number: data.document_number,
                dob: data.dob,
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                phone_number: data.phone_number,
                gender: data.gender,
                username: data.username,
                password: bcrypt.hashSync(data.password, 10),
                status: data.status
            });

            response.result(user);

            return response.resolve();
        } catch (err) {
            console.log(err);
        }
    }
}