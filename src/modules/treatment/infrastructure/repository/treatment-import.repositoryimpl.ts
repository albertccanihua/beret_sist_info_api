import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";
import { TreatmentImport } from "../../domain/models/treatment-import.model";
import { TreatmentImportEntity } from "../entities/treatment-import.entity";
import { TreatmentImportsRepository } from "../../domain/repository/treatment-imports.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";

export class TreatmentImportRepositoryImpl extends BaseRepositoryImpl<TreatmentImportEntity, TreatmentImport> implements TreatmentImportsRepository {

    constructor(
        @InjectRepository(TreatmentImportEntity)
        protected treatmentImportRepository: Repository<TreatmentImportEntity>
    ) {
        super(
            treatmentImportRepository,
            'treatment_import',
            (query, args) => this.customFilters(query, args)
        );
    }

    private customFilters(query: IQueryBuilderRequest<TreatmentImportEntity>, args: any): void {

    }

}