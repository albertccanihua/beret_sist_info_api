import { Injectable } from "@nestjs/common";
import { Speciality } from "../../domain/models/speciality.model";
import { SpecialityEntity } from "../entities/speciality.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { GeneralHelper } from "src/common/helpers/general.helper";
import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";

@Injectable()
export class SpecialitiesRepositoryImpl extends BaseRepositoryImpl<SpecialityEntity, Speciality> {

    constructor(
        @InjectRepository(SpecialityEntity)
        protected specialityRepository: Repository<SpecialityEntity>
    ) {
        super(specialityRepository, 'speciality', (query, args) => this.customFilters(query, args));
    }

    private customFilters(query: IQueryBuilderRequest<SpecialityEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.where('id = :id', { id: args.id });
        if (GeneralHelper.existsAndNotEmpty(args, 'code')) query.value.where('code = :code', { code: args.code });
        if (GeneralHelper.existsAndNotEmpty(args, 'name')) query.value.where('name = :name', { name: args.name });
        if (GeneralHelper.existsAndNotEmpty(args, 'status')) query.value.where('status = :status', { status: args.status });
    }
}