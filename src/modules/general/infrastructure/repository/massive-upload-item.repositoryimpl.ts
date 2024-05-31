import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";
import { MassiveUploadItemEntity } from "../entities/massive-upload-item.entity";
import { MassiveUploadItem } from "../../domain/models/massive-upload-item.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { GeneralHelper } from "src/common/helpers/general.helper";
import { MassiveUploadItemRepository } from "../../domain/repository/massive-upload-item.repository";

export class MassiveUploadItemRepositoryImpl extends BaseRepositoryImpl<MassiveUploadItemEntity, MassiveUploadItem> implements MassiveUploadItemRepository {

    constructor(
        @InjectRepository(MassiveUploadItemEntity)
        private massiveUploadItemEntityRepository: Repository<MassiveUploadItemEntity>
    ) {
        super(
            massiveUploadItemEntityRepository,
            'massiveUploadItem',
            (query, args) => this.customFilters(query, args)
        );
    }

    private customFilters(query: IQueryBuilderRequest<MassiveUploadItem>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.andWhere('massiveUpload.id = :id', { id: args.id });
    }

}