import { IResponse } from "src/common/interfaces/response.interface";
import { UsersRepository } from "../../domain/repository/users.repository";
import { LoginDto } from "../dto/login.dto";
import { User } from "../../domain/models/user.model";
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";

export class LoginUseCase {

    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService
    ) { }

    async exec(data: LoginDto): Promise<IResponse<User>> {
        try {
            const response = new ResponseHelper();

            const user = await this.usersRepository.findByUsername(data.username);

            if (!user || !bcrypt.compareSync(data.password, user.password)) throw new UnauthorizedException("Credentials are not valid");

            delete user.password;

            const userToken = {
                ...user,
                token: this.getJwtToken({
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    role: user.type_role
                })
            }

            response.result(userToken);

            return response.resolve();
        } catch (error) {
            console.log(error);
            throw new HandleExceptionHelper(error).throw();
        }
    }

    private getJwtToken(payload: IJwtPayload) {
        const token = this.jwtService.sign(payload);
        return token;
    }

}