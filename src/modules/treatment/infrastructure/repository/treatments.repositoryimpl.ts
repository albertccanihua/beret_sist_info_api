import { Injectable } from "@nestjs/common";
import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";
import { TreatmentEntity } from "../entities/treatment.entity";
import { Treatment } from "../../domain/models/treatment.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { TreatmentsRepository } from "../../domain/repository/treatments.repository";
import { GeneralHelper } from "src/common/helpers/general.helper";
import { IShowTreatmentRepositoryResponse } from "../../domain/interfaces/show-treatment-repository-response.interface";

@Injectable()
export class TreatmentsRepositoryImpl extends BaseRepositoryImpl<TreatmentEntity, Treatment> implements TreatmentsRepository {

    constructor(
        @InjectRepository(TreatmentEntity)
        protected treatmentRepository: Repository<TreatmentEntity>
    ) {
        super(
            treatmentRepository,
            'treatment',
            (query, args) => this.customFilters(query, args)
        );
    }

    async show(id: any): Promise<IShowTreatmentRepositoryResponse | any> {
        const record: TreatmentEntity | null = await this.requestBroker.queryBuilder('treatment')
            .setArgs({ id })
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .leftJoinAndSelect('treatment.patient', 'patient')
            .leftJoinAndSelect('patient.type_financing', 'type_financing')
            .leftJoinAndSelect('patient.type_document', 'type_document')
            .leftJoinAndSelect('patient.type_gender', 'type_gender')
            .leftJoinAndSelect('treatment.type_status_treatment', 'type_status_treatment')
            .leftJoinAndSelect('treatment.treatment_specialities', 'treatment_specialities')
            .leftJoinAndSelect('treatment_specialities.speciality', 'ts_speciality')
            .leftJoinAndSelect('treatment_specialities.treatment_assistances', 'treatment_assistances')
            .leftJoinAndSelect('treatment_assistances.treatment_speciality', 'ta_speciality')
            .leftJoinAndSelect('treatment_assistances.profesional', 'ta_profesional')
            .getOne();

        if (!record) return null;
        return record;
    }

    async get(args: any): Promise<Treatment[] | any> {
        const treatments: TreatmentEntity[] = await this.requestBroker.queryBuilder('treatment')
            .setArgs(args)
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .innerJoinAndSelect('treatment.patient', 'patient')
            .innerJoinAndSelect('treatment.packet', 'packet')
            .innerJoinAndSelect('treatment.type_status_treatment', 'type_status_treatment')
            .getMany();

        return treatments;
    }

    async getPatientTreatmentCorrelative(patient_id: number, patient_document_number: string):
        Promise<{ correlative: string, number: string }> {
        const pastTreatments: Treatment[] = await this.get({ patient: patient_id });

        const treatmentCurrentNumber = pastTreatments.length + 1;
        const processedNumber = treatmentCurrentNumber.toString().padStart(3, '0');

        const date = new Date();
        const currentYear = date.getFullYear();

        return {
            correlative: `${currentYear}${patient_document_number}${processedNumber}`,
            number: processedNumber
        };
    }

    private customFilters(query: IQueryBuilderRequest<TreatmentEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.andWhere('treatment.id = :id', { id: args.id });
        if (GeneralHelper.existsAndNotEmpty(args, 'code')) query.value.andWhere('treatment.code = :code', { code: args.code });
        if (GeneralHelper.existsBoolean(args, 'status')) query.value.andWhere('treatment.status = :status', { status: args.status });
        if (GeneralHelper.existsAndNotEmpty(args, 'packet')) query.value.andWhere('treatment.packet_id = :packet', { packet: args.packet });
        if (GeneralHelper.existsAndNotEmpty(args, 'patient')) query.value.andWhere('treatment.patient_id = :patient', { patient: args.patient });
        if (GeneralHelper.existsAndNotEmpty(args, 'type_status_treatment')) query.value.andWhere('treatment.type_status_treatment_id = :type_status_treatment', { type_status_treatment: args.type_status_treatment });
        if (GeneralHelper.existsAndNotEmpty(args, 'patient_document_number')) query.value.andWhere('patient.document_number = :patient_document_number', { patient_document_number: args.patient_document_number });
    }
}