import { Injectable } from "@nestjs/common";
import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { TreatmentRequestEntity } from "../entities/treatment-request.entity";
import { TreatmentRequest } from "../../domain/models/treatment-request.model";
import { TreatementRequestsRepository } from "../../domain/repository/treatment-requests.repository";
import { GeneralHelper } from "src/common/helpers/general.helper";
import { IGetFollowUpRepositoryResponse } from "../../domain/interfaces/get-follow-up-repository-response.interface";
import { IGetRequestFollowUpDetailsRepositoryResponse, RequestsPer } from "../../domain/interfaces/get-requests-follow-up-details-repository-response.interface";

@Injectable()
export class TreatmentRequestsRepositoryImpl extends BaseRepositoryImpl<TreatmentRequestEntity, TreatmentRequest> implements TreatementRequestsRepository {

    constructor(
        @InjectRepository(TreatmentRequestEntity)
        protected treatmentRequestRepository: Repository<TreatmentRequestEntity>
    ) {
        super(
            treatmentRequestRepository,
            'treatment_request',
            (query, args) => this.customFilters(query, args)
        );
    }

    async getFollowUp({ user_creator, created_at }): Promise<IGetFollowUpRepositoryResponse> {
        const requests_per_day = await this.requestBroker.queryBuilder('treatment_request')
            .setArgs({ user_creator, created_at })
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .getCount();

        const requests_per_month = await this.requestBroker.queryBuilder('treatment_request')
            .setArgs({ user_creator, created_at_per_month: created_at })
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .getCount();

        return {
            requests_per_day,
            requests_per_month
        };
    }

    async getFollowUpDetails({ created_at }): Promise<IGetRequestFollowUpDetailsRepositoryResponse> {
        const requests_per_day: any = await this.requestBroker.queryBuilder('treatment_request')
            .setArgs({ created_at })
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .leftJoinAndSelect('treatment_request.user_creator', 'user_creator')
            .innerJoinAndSelect('treatment_request.patient', 'patient')
            .getMany();

        const requests_per_month: any = await this.requestBroker.queryBuilder('treatment_request')
            .setArgs({ created_at_per_month: created_at })
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .innerJoinAndSelect('treatment_request.patient', 'patient')
            .getMany();

        return {
            requests_per_day,
            requests_per_month
        };
    }

    private customFilters(query: IQueryBuilderRequest<TreatmentRequestEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.andWhere('treatment_request.id = :id', { id: args.id });
        if (GeneralHelper.existsAndNotEmpty(args, 'user_creator')) query.value.andWhere('treatment_request.user_creator = :user_creator', { user_creator: args.user_creator });
        if (GeneralHelper.existsAndNotEmpty(args, 'patient')) query.value.andWhere('treatment_request.patient_id = :patient', { patient: args.patient });
        if (GeneralHelper.existsAndNotEmpty(args, 'created_at')) query.value.andWhere(
            'DATE_FORMAT(treatment_request.created_at, "%Y-%m-%d") = :created_at',
            { created_at: args.created_at }
        );
        if (GeneralHelper.existsAndNotEmpty(args, 'created_at_per_month')) query.value.andWhere(
            'DATE_FORMAT(treatment_request.created_at, "%Y-%m") = DATE_FORMAT(:created_at, "%Y-%m")',
            { created_at: args.created_at_per_month }
        );
    }

}