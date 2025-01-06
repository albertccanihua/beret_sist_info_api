import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";
import { PatientEntity } from "../entities/patient.entity";
import { Patient } from "../../domain/models/patient.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { Injectable } from "@nestjs/common";
import { GeneralHelper } from "src/common/helpers/general.helper";
import {
    IQueryBuilderPaginatedResponse
} from "src/common/packages/request-broker/interfaces/query-builder-response-paginated.interface";
import { PatientsRepository } from "../../domain/repository/patients.repository";

@Injectable()
export class PatientsRepositoryImpl extends BaseRepositoryImpl<PatientEntity, Patient> implements PatientsRepository {

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

    async showByParams(args: any): Promise<Patient | any> {
        const record: PatientEntity | null = await this.requestBroker.queryBuilder('patient')
            .setArgs(args)
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .innerJoinAndSelect('patient.type_document', 'type_document')
            .innerJoinAndSelect('patient.type_gender', 'type_gender')
            .innerJoinAndSelect('patient.type_financing', 'type_financing')
            .getOne();

        if (!record) return null;
        return record;
    }

    async list(args: any): Promise<IQueryBuilderPaginatedResponse<PatientEntity>> {
        const offset = (args.page - 1) * args.limit;

        const query = this.requestBroker.queryBuilder('patient')
            .setArgs(args)
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .innerJoinAndSelect('patient.type_document', 'type_document')
            .innerJoinAndSelect('patient.type_gender', 'type_gender')
            .innerJoinAndSelect('patient.type_financing', 'type_financing');

        const patientCount = await query.getCount();
        const patients: PatientEntity[] = await query.offset(offset).limit(args.limit).getMany();

        return {
            total_data: patientCount,
            total_page: patients.length,
            page: args.page,
            data: patients
        };
    }

    private customFilters(query: IQueryBuilderRequest<PatientEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.andWhere('patient.id = :id', { id: args.id });
        if (GeneralHelper.existsAndNotEmpty(args, 'name')) query.value.andWhere('patient.name LIKE :name', { name: `%${args.name}%` })
        if (GeneralHelper.existsAndNotEmpty(args, 'paternal_surname')) query.value.andWhere('patient.paternal_surname LIKE :paternal_surname', { paternal_surname: `%${args.paternal_surname}%` })
        if (GeneralHelper.existsAndNotEmpty(args, 'type_document')) query.value.andWhere('patient.type_document_id = :type_document', { type_document: args.type_document });
        if (GeneralHelper.existsAndNotEmpty(args, 'type_financing')) query.value.andWhere('patient.type_financing_id = :type_financing', { type_financing: args.type_financing });
        if (GeneralHelper.existsAndNotEmpty(args, 'document_number')) query.value.andWhere('patient.document_number = :document_number', { document_number: args.document_number });
        if (GeneralHelper.existsAndNotEmpty(args, 'medical_history')) query.value.andWhere('patient.medical_history = :medical_history', { medical_history: args.medical_history });
        if (GeneralHelper.existsAndNotEmpty(args, 'status')) query.value.andWhere('patient.status = :status', { status: args.status });
    }
}