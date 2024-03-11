import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";
import { ManagementTypeEntity } from "../entities/management-type.entity";
import { ManagementType } from "../../domain/models/management-type.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { Injectable } from "@nestjs/common";
import { GeneralHelper } from "src/common/helpers/general.helper";

@Injectable()
export class ManagementTypesRepositoryImpl extends BaseRepositoryImpl<ManagementTypeEntity, ManagementType>{

    constructor(
        @InjectRepository(ManagementTypeEntity)
        private managementEntityRepository: Repository<ManagementTypeEntity>
    ) {
        super(managementEntityRepository, 'managementType', (query, args) => this.customFilters(query, args));
    }

    private customFilters(query: IQueryBuilderRequest<ManagementType>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.where('id = :id', { id: args.id });
        if (GeneralHelper.existsAndNotEmpty(args, 'code')) query.value.where('code = :code', { code: args.code });
        if (GeneralHelper.existsAndNotEmpty(args, 'name')) query.value.where('name = :name', { name: args.name });
        if (GeneralHelper.existsAndNotEmpty(args, 'type')) query.value.where('type = :type', { type: args.type });
        if (GeneralHelper.existsAndNotEmpty(args, 'status')) query.value.where('status = :status', { status: args.status });
    }

}