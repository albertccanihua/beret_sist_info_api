import { Injectable } from "@nestjs/common";
import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";
import { TreatmentAssistanceEntity } from "../entities/treatment-assistance.entity";
import { TreatmentAssistance } from "../../domain/models/treatment-assistance.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { IGetAssistanceFollowUpRepositoryResponse } from "../../domain/interfaces/get-assistance-follow-up-repository-response.interface";
import { GeneralHelper } from "src/common/helpers/general.helper";
import { TreatmentAssistancesRepository } from "../../domain/repository/treatment-assistances.repository";

@Injectable()
export class TreatmentAssistancesRepositoryImpl extends BaseRepositoryImpl<TreatmentAssistanceEntity, TreatmentAssistance> implements TreatmentAssistancesRepository {

    constructor(
        @InjectRepository(TreatmentAssistanceEntity)
        protected treatmentAssistanceRepository: Repository<TreatmentAssistanceEntity>
    ) {
        super(
            treatmentAssistanceRepository,
            'treatment_assistance',
            (query, args) => this.customFilters(query, args)
        );
    }

    async getFollowUp({ profesional, date_care }): Promise<IGetAssistanceFollowUpRepositoryResponse> {

        const treatments_per_day = await this.requestBroker.queryBuilder('treatment_assistance')
            .setArgs({ profesional, date_care })
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .getCount();

        const treatments_per_month = await this.requestBroker.queryBuilder('treatment_assistance')
            .setArgs({ profesional, date_care_per_month: date_care })
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .getCount();

        return {
            treatments_per_day,
            treatments_per_month
        };
    }

    private customFilters(query: IQueryBuilderRequest<TreatmentAssistanceEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'profesional')) query.value.andWhere('treatment_assistance.profesional = :profesional', { profesional: args.profesional });
        if (GeneralHelper.existsAndNotEmpty(args, 'date_care')) query.value.andWhere(
            'DATE_FORMAT(treatment_assistance.date_care, "%Y-%m-%d") = :date_care',
            { date_care: args.date_care }
        );
        if (GeneralHelper.existsAndNotEmpty(args, 'date_care_per_month')) query.value.andWhere(
            'DATE_FORMAT(treatment_assistance.date_care, "%Y-%m") = DATE_FORMAT(:date_care, "%Y-%m")',
            { date_care: args.date_care_per_month }
        );
    }

}