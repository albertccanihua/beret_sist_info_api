import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../../domain/models/user.model";
import { UsersRepository } from "../../domain/repository/users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import { RequestBroker } from "src/common/packages/request-broker/request-broker";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { GeneralHelper } from "src/common/helpers/general.helper";
import { IQueryBuilderPaginatedResponse } from "src/common/packages/request-broker/interfaces/query-builder-response-paginated.interface";

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {

    private requestBroker: RequestBroker<UserEntity>;

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {
        this.requestBroker = new RequestBroker<UserEntity>(userRepository);
    }

    async show(id: any): Promise<User> {
        const user: UserEntity | null = await this.requestBroker.queryBuilder()
            .setAlias('show-user')
            .setArgs({ id })
            .applyFilters((query, args) => this.filters(query, args))
            .getInstance()
            .getOne();

        if (!user) throw new NotFoundException("User not found");
        return user;
    }

    async get(args: any): Promise<User[]> {
        const users: UserEntity[] | [] = await this.requestBroker.queryBuilder()
            .setAlias('get-users')
            .setArgs(args)
            .applyFilters((query, args) => this.filters(query, args))
            .getInstance()
            .getMany();
        return users;
    }

    async list(args: any): Promise<IQueryBuilderPaginatedResponse<User>> {
        const users: IQueryBuilderPaginatedResponse<UserEntity> = await this.requestBroker.queryBuilder()
            .setAlias('list-users')
            .setArgs(args)
            .applyFilters((query, args) => this.filters(query, args))
            .getManyPaginated(args.page, args.limit)
        return users;
    }

    async create(data: User): Promise<User> {
        try {
            const user: UserEntity = this.userRepository.create(data)
            await this.userRepository.manager.save(user);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async update(id: any, data: User): Promise<User> {
        const user: UserEntity = await this.userRepository.preload({ id, ...data });

        if (!user) throw new NotFoundException("User not found");

        try {
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: any): Promise<User> {
        try {
            const user: User = await this.show(id);
            await this.userRepository.softRemove(user);

            return user;
        } catch (error) {
            throw error;
        }
    }

    private filters(query: IQueryBuilderRequest<UserEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, "id")) query.value.where("id = :id", { id: args.id });
        if (GeneralHelper.existsAndNotEmpty(args, "document_type")) query.value.where("document_type = :document_type", { document_type: args.document_type });
        if (GeneralHelper.existsAndNotEmpty(args, "document_number")) query.value.where("document_number = :document_number", { document_number: args.document_number });
        if (GeneralHelper.existsAndNotEmpty(args, "name")) query.value.where("name LIKE :name", { name: `%${args.name}%` });
        if (GeneralHelper.existsAndNotEmpty(args, "lastname")) query.value.where("lastname LIKE :lastname", { lastname: `%${args.lastname}%` });
        if (GeneralHelper.existsAndNotEmpty(args, "username")) query.value.where("username LIKE :username", { username: `%${args.username}%` });
        if (GeneralHelper.existsAndNotEmpty(args, "status")) query.value.where("status = :status", { status: args.status });
    }

}