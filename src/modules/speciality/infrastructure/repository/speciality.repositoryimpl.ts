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

        const query = this.requestBroker.queryBuilder('speciality')
            .setArgs(args)
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .leftJoinAndSelect('speciality.user_creator', 'user_creator')
            .select(['speciality', ...RelationshipHelper.userCreator()]);

        const specialitiesCount = await query.getCount();
        const specialitiesPaginated: SpecialityEntity[] = await query.offset(offset).limit(args.limit).getMany();

        return {
            total_data: specialitiesCount,
            total_page: specialitiesPaginated.length,
            page: args.page,
            data: specialitiesPaginated
        };
    }

    private customFilters(query: IQueryBuilderRequest<SpecialityEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.andWhere('speciality.id = :id', { id: args.id });
        if (GeneralHelper.existsAndNotEmpty(args, 'code')) query.value.andWhere('speciality.code = :code', { code: args.code });
        if (GeneralHelper.existsAndNotEmpty(args, 'name')) query.value.andWhere('speciality.name LIKE :name', { name: `%${args.name}%` });
        if (GeneralHelper.existsBoolean(args, 'status')) query.value.andWhere('speciality.status = :status', { status: args.status });
    }
}