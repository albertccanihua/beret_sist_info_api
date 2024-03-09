import { BaseRepository } from "src/common/repository/base.repository";
import { User } from "../models/user.model";

export interface UsersRepository extends BaseRepository<User> { }