import { Injectable } from "@nestjs/common";
import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";
import { TreatmentSpecialityEntity } from "../entities/treatment-speciality.entity";
import { TreatmentSpeciality } from "../../domain/models/treatment-speciality.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { GeneralHelper } from "src/common/helpers/general.helper";

@Injectable()
export class TreatmentSpecialitiesRepositoryImpl extends BaseRepositoryImpl<TreatmentSpecialityEntity, TreatmentSpeciality> {

    constructor(
        @InjectRepository(TreatmentSpecialityEntity)
        protected treatmentSpecialityRepository: Repository<TreatmentSpecialityEntity>
    ) {
        super(
            treatmentSpecialityRepository,
            'treatment_speciality',
            (query, args) => this.customFilters(query, args)
        );
    }

    private customFilters(query: IQueryBuilderRequest<TreatmentSpecialityEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'treatment')) query.value.andWhere('treatment_speciality.treatment_id = :treatment', { treatment: args.treatment });
        if (GeneralHelper.existsAndNotEmpty(args, 'speciality')) query.value.andWhere('treatment_speciality.speciality_id = :speciality', { speciality: args.speciality });
    }
}