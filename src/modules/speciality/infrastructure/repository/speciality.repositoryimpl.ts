import { Injectable } from "@nestjs/common";
import { Speciality } from "../../domain/models/speciality.model";
import { SpecialityEntity } from "../entities/speciality.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { GeneralHelper } from "src/common/helpers/general.helper";
import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";
import { IQueryBuilderPaginatedResponse } from "src/common/packages/request-broker/interfaces/query-builder-response-paginated.interface";
import { RelationshipHelper } from "src/common/helpers/relationship.helper";

@Injectable()
export class SpecialitiesRepositoryImpl extends BaseRepositoryImpl<SpecialityEntity, Speciality> {

    constructor(
        @InjectRepository(SpecialityEntity)
        protected specialityRepository: Repository<SpecialityEntity>
    ) {
        super(specialityRepository, 'speciality', (query, args) => this.customFilters(query, args));
    }

    async list(args: any): Promise<IQueryBuilderPaginatedResponse<SpecialityEntity>> {
        const offset = (args.page - 1) * args.limit;

        const users: SpecialityEntity[] = await this.requestBroker.queryBuilder('speciality')
            .setArgs(args)
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .innerJoinAndSelect('speciality.user_creator', 'user_creator')
            .select(['speciality', ...RelationshipHelper.userCreator()])
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

    private customFilters(query: IQueryBuilderRequest<SpecialityEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.where('speciality.id = :id', { id: args.id });
        if (GeneralHelper.existsAndNotEmpty(args, 'code')) query.value.where('speciality.code = :code', { code: args.code });
        if (GeneralHelper.existsAndNotEmpty(args, 'name')) query.value.where('speciality.name = :name', { name: args.name });
        if (GeneralHelper.existsAndNotEmpty(args, 'status')) query.value.where('speciality.status = :status', { status: args.status });
    }
}