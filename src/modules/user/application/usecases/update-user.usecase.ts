import { ResponseHelper } from "src/common/helpers/response.helper";
import { User } from "../../domain/models/user.model";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UsersRepository } from "../../domain/repository/users.repository";
import * as bcrypt from 'bcrypt';
import { IResponse } from "src/common/interfaces/response.interface";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { NotFoundException } from "@nestjs/common";

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
                paternal_surname: data.paternal_surname,
                maternal_lastname: data.maternal_lastname,
                email: data.email,
                phone_number: data.phone_number,
                gender: data.gender,
                role: data.role,
                username: data.username,
                password: bcrypt.hashSync(data.password, 10),
                status: data.status
            });

            if (!user) throw new NotFoundException('User not found');

            delete user.password;

            response.result(user);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}