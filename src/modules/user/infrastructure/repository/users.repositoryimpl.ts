import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../domain/models/user.model';
import { UserEntity } from '../entities/user.entity';
import { IQueryBuilderRequest } from 'src/common/packages/request-broker/interfaces/query-builder-request.interface';
import { GeneralHelper } from 'src/common/helpers/general.helper';
import { BaseRepositoryImpl } from 'src/common/repository/base.repositoryimpl';

@Injectable()
export class UsersRepositoryImpl extends BaseRepositoryImpl<UserEntity, User>{

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {
        super(userRepository, 'user', (query, args) => this.customFilters(query, args));
    }

    private customFilters(query: IQueryBuilderRequest<UserEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.where('id = :id', { id: args.id });
        if (GeneralHelper.existsAndNotEmpty(args, 'document_type')) query.value.where('document_type = :document_type', { document_type: args.document_type });
        if (GeneralHelper.existsAndNotEmpty(args, 'document_number')) query.value.where('document_number = :document_number', { document_number: args.document_number });
        if (GeneralHelper.existsAndNotEmpty(args, 'name')) query.value.where('name LIKE :name', { name: `%${args.name}%` });
        if (GeneralHelper.existsAndNotEmpty(args, 'paternal_surname')) query.value.where('paternal_surname LIKE :paternal_surname', { paternal_surname: `%${args.paternal_surname}%` });
        if (GeneralHelper.existsAndNotEmpty(args, 'maternal_lastname')) query.value.where('maternal_lastname LIKE :maternal_lastname', { maternal_lastname: `%${args.maternal_lastname}%` });
        if (GeneralHelper.existsAndNotEmpty(args, 'role')) query.value.where('role = :role', { role: args.role });
        if (GeneralHelper.existsAndNotEmpty(args, 'username')) query.value.where('username LIKE :username', { username: `%${args.username}%` });
        if (GeneralHelper.existsAndNotEmpty(args, 'status')) query.value.where('status = :status', { status: args.status });
    }

}