import { Injectable, NotFoundException } from "@nestjs/common";
import { Speciality } from "../../domain/models/speciality.model";
import { SpecialitiesRepository } from "../../domain/repository/specialities.repository";
import { RequestBroker } from "src/common/packages/request-broker/request-broker";
import { SpecialityEntity } from "../entities/speciality.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { IQueryBuilderPaginatedResponse } from "src/common/packages/request-broker/interfaces/query-builder-response-paginated.interface";
import { GeneralHelper } from "src/common/helpers/general.helper";

@Injectable()
export class SpecialitiesRepositoryImpl implements SpecialitiesRepository {

    private requestBroker: RequestBroker<SpecialityEntity>;

    constructor(
        @InjectRepository(SpecialityEntity)
        private specialityRepository: Repository<SpecialityEntity>
    ) {
        this.requestBroker = new RequestBroker<SpecialityEntity>(specialityRepository);
    }

    async show(id: any): Promise<Speciality> {
        const speciality: SpecialityEntity | null = await this.requestBroker.queryBuilder()
            .setAlias('show-speciality')
            .setArgs({ id })
            .applyFilters((query, args) => this.filters(query, args))
            .getInstance()
            .getOne();

        if (!speciality) throw new NotFoundException('Speciality not found');
        return speciality;
    }

    async get(args: any): Promise<Speciality[]> {
        const specialities: SpecialityEntity[] | [] = await this.requestBroker.queryBuilder()
            .setAlias('get-specialities')
            .setArgs(args)
            .applyFilters((query, args) => this.filters(query, args))
            .getInstance()
            .getMany();
        return specialities;
    }

    async list(args: any): Promise<IQueryBuilderPaginatedResponse<SpecialityEntity>> {
        const specialities: IQueryBuilderPaginatedResponse<SpecialityEntity> = await this.requestBroker.queryBuilder()
            .setAlias('list-specialities')
            .setArgs(args)
            .applyFilters((query, args) => this.filters(query, args))
            .getManyPaginated(args.page, args.limit);
        return specialities;
    }

    async create(data: Speciality): Promise<Speciality> {
        try {
            const speciality: SpecialityEntity = this.specialityRepository.create(data);
            await this.specialityRepository.manager.save(speciality);
            return speciality;
        } catch (error) {
            throw error;
        }
    }

    async update(id: any, data: Speciality): Promise<Speciality> {
        const speciality: SpecialityEntity = await this.specialityRepository.preload({ id, ...data });

        if (!speciality) throw new NotFoundException('Speciality not found');

        try {
            await this.specialityRepository.save(speciality);
            return speciality;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: any): Promise<Speciality> {
        try {
            const speciality: Speciality = await this.show(id);
            await this.specialityRepository.softRemove(speciality);

            return speciality;
        } catch (error) {
            throw error;
        }
    }

    private filters(query: IQueryBuilderRequest<SpecialityEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.where('id = :id', { id: args.id });
        if (GeneralHelper.existsAndNotEmpty(args, 'code')) query.value.where('code = :code', { code: args.code });
        if (GeneralHelper.existsAndNotEmpty(args, 'name')) query.value.where('name = :name', { name: args.name });
        if (GeneralHelper.existsAndNotEmpty(args, 'status')) query.value.where('status = :status', { status: args.status });
    }
}