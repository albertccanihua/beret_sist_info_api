import { BaseRepository } from "src/common/repository/base.repository";
import { User } from "../models/user.model";
import { UpdateUserRequest } from "../requests/update-user.request";

export interface UsersRepository extends BaseRepository<User> {

    customUpdate(id: any, data: UpdateUserRequest): Promise<User>;
    changePassword(id: number, password: string): Promise<boolean | null>;
    findByUsername(username: string): Promise<User>;

}