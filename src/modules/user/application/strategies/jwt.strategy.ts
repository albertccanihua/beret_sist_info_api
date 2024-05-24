import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { User } from "../../domain/models/user.model";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepositoryImpl } from "../../infrastructure/repository/users.repositoryimpl";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly usersRepository: UsersRepositoryImpl
    ) {
        super({
            secretOrKey: 'this_is_a_new_backend_passport_authentication_token',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: IJwtPayload): Promise<User> {
        const { username } = payload;

        const user = await this.usersRepository.findByUsername(username);

        if (!user) throw new UnauthorizedException('Token is not valid');
        if (!user.status) throw new UnauthorizedException('Token is not valid');

        return user;
    }

}