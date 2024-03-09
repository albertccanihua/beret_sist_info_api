import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../../domain/models/user.model";
import { UsersRepository } from "../../domain/repository/users.repository";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { HttpStatus } from "@nestjs/common";
import { IResponse } from "src/common/interfaces/response.interface";
import * as bcrypt from 'bcrypt';

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
                lastname: data.lastname,
                email: data.email,
                phone_number: data.phone_number,
                gender: data.gender,
                username: data.username,
                password: bcrypt.hashSync(data.password, 10),
                status: data.status
            });

            response.code(HttpStatus.CREATED).result(user);

            return response.resolve();
        } catch (err) {
            console.log(err);
        }
    }

}