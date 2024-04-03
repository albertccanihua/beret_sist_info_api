import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../domain/models/user.model';
import { UserEntity } from '../entities/user.entity';
import { IQueryBuilderRequest } from 'src/common/packages/request-broker/interfaces/query-builder-request.interface';
import { GeneralHelper } from 'src/common/helpers/general.helper';
import { BaseRepositoryImpl } from 'src/common/repository/base.repositoryimpl';
import { IQueryBuilderPaginatedResponse } from 'src/common/packages/request-broker/interfaces/query-builder-response-paginated.interface';

@Injectable()
export class UsersRepositoryImpl extends BaseRepositoryImpl<UserEntity, User>{

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {
        super(userRepository, 'user', (query, args) => this.customFilters(query, args));
    }

    async show(id: any): Promise<User | any> {
        const record: UserEntity | null = await this.requestBroker.queryBuilder('user')
            .setArgs({ id })
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .leftJoinAndSelect('user.type_document', 'type_document')
            .leftJoinAndSelect('user.type_gender', 'type_gender')
            .leftJoinAndSelect('user.type_role', 'type_role')
            .getOne();

        if (!record) return null;
        return record;
    }

    async list(args: any): Promise<IQueryBuilderPaginatedResponse<UserEntity>> {
        const offset = (args.page - 1) * args.limit;

        const users: UserEntity[] = await this.requestBroker.queryBuilder('user')
            .setArgs(args)
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .leftJoinAndSelect('user.type_document', 'type_document')
            .leftJoinAndSelect('user.type_gender', 'type_gender')
            .leftJoinAndSelect('user.type_role', 'type_role')
            .offset(offset)
            .limit(args.limit)
            .getMany();

        return {
            total_data: 100,
            total_page: users.length,
            page: args.page,
            data: users
        };
    }

    private customFilters(query: IQueryBuilderRequest<UserEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.andWhere('user.id = :id', { id: args.id });
        if (GeneralHelper.existsAndNotEmpty(args, 'document_number')) query.value.andWhere('user.document_number = :document_number', { document_number: args.document_number });
        if (GeneralHelper.existsAndNotEmpty(args, 'name')) query.value.andWhere('user.name LIKE :name', { name: `%${args.name}%` });
        if (GeneralHelper.existsAndNotEmpty(args, 'paternal_surname')) query.value.andWhere('user.paternal_surname LIKE :paternal_surname', { paternal_surname: `%${args.paternal_surname}%` });
        if (GeneralHelper.existsAndNotEmpty(args, 'maternal_lastname')) query.value.andWhere('user.maternal_lastname LIKE :maternal_lastname', { maternal_lastname: `%${args.maternal_lastname}%` });
        if (GeneralHelper.existsAndNotEmpty(args, 'username')) query.value.andWhere('user.username LIKE :username', { username: `%${args.username}%` });
        if (GeneralHelper.existsAndNotEmpty(args, 'status')) query.value.andWhere('user.status = :status', { status: args.status });
        if (GeneralHelper.existsAndNotEmpty(args, 'type_document')) query.value.andWhere('user.type_document_id = :type_document', { type_document: args.type_document });
        if (GeneralHelper.existsAndNotEmpty(args, 'type_role')) query.value.andWhere('user.type_role_id = :type_role', { type_role: args.type_role });
    }

}