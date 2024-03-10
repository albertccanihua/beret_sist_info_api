import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../../domain/models/user.model";
import { UsersRepository } from "../../domain/repository/users.repository";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { HttpStatus } from "@nestjs/common";
import { IResponse } from "src/common/interfaces/response.interface";
import * as bcrypt from 'bcrypt';
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";

export class CreateUserUseCase {

    constructor(
        private readonly usersRepository: UsersRepository
    ) { }

    async exec(data: CreateUserDto): Promise<IResponse<User>> {
        try {
            const response = new ResponseHelper();

            const user = await this.usersRepository.create({
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

            delete user.password;

            response.code(HttpStatus.CREATED).result(user);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

}