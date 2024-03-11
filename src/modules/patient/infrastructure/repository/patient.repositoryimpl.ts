import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";
import { PatientEntity } from "../entities/patient.entity";
import { Patient } from "../../domain/models/patient.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PatientsRepositoryImpl extends BaseRepositoryImpl<PatientEntity, Patient>{

    constructor(
        @InjectRepository(PatientEntity)
        private patientRepository: Repository<PatientEntity>
    ) {
        super(patientRepository, 'patient', (query, args) => this.customFilters(query, args));
    }

    private customFilters(query: IQueryBuilderRequest<PatientEntity>, args: any): void {

    }
}