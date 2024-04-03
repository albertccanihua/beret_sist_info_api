import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";
import { PatientEntity } from "../entities/patient.entity";
import { Patient } from "../../domain/models/patient.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { Injectable } from "@nestjs/common";
import { GeneralHelper } from "src/common/helpers/general.helper";
import { IQueryBuilderPaginatedResponse } from "src/common/packages/request-broker/interfaces/query-builder-response-paginated.interface";

@Injectable()
export class PatientsRepositoryImpl extends BaseRepositoryImpl<PatientEntity, Patient>{

    constructor(
        @InjectRepository(PatientEntity)
        private patientRepository: Repository<PatientEntity>
    ) {
        super(patientRepository, 'patient', (query, args) => this.customFilters(query, args));
    }

    async show(id: any): Promise<Patient | any> {
        const record: PatientEntity | null = await this.requestBroker.queryBuilder('patient')
            .setArgs({ id })
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .innerJoinAndSelect('patient.type_document', 'type_document')
            .innerJoinAndSelect('patient.type_gender', 'type_gender')
            .innerJoinAndSelect('patient.type_financing', 'type_financing')
            .where('patient.id = :id', { id: id })
            .getOne();

        if (!record) return null;
        return record;
    }

    async list(args: any): Promise<IQueryBuilderPaginatedResponse<PatientEntity>> {
        const offset = (args.page - 1) * args.limit;

        const users: PatientEntity[] = await this.requestBroker.queryBuilder('patient')
            .setArgs(args)
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .innerJoinAndSelect('patient.type_document', 'type_document')
            .innerJoinAndSelect('patient.type_gender', 'type_gender')
            .innerJoinAndSelect('patient.type_financing', 'type_financing')
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

    private customFilters(query: IQueryBuilderRequest<PatientEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.where('id = :id', { id: args.id });
        if (GeneralHelper.existsAndNotEmpty(args, 'status')) query.value.where('status = :status', { status: args.status });
        if (GeneralHelper.existsAndNotEmpty(args, 'name')) query.value.where('name LIKE :name', { name: `%${args.name}` });
    }
}