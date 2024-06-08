import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";
import { MassiveUploadEntity } from "../entities/massive-upload.entity";
import { MassiveUpload } from "../../domain/models/massive-upload.model";
import { MassiveUploadRepository } from "../../domain/repository/massive-upload.repository";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GeneralHelper } from "src/common/helpers/general.helper";

export class MassiveUploadRepositoryImpl extends BaseRepositoryImpl<MassiveUploadEntity, MassiveUpload> implements MassiveUploadRepository {

    constructor(
        @InjectRepository(MassiveUploadEntity)
        private massiveUploadEntityRepository: Repository<MassiveUploadEntity>
    ) {
        super(
            massiveUploadEntityRepository,
            'massiveUpload',
            (query, args) => this.customFilters(query, args)
        );
    }

    async show(id: any): Promise<MassiveUpload | null> {
        const massiveUpload: MassiveUploadEntity | null = await this.requestBroker.queryBuilder('massiveUpload')
            .setArgs({ id })
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .leftJoinAndSelect('massiveUpload.massive_upload_items', 'massiveUploadItems')
            .getOne();

        if (!massiveUpload) return null;
        return massiveUpload;
    }

    private customFilters(query: IQueryBuilderRequest<MassiveUpload>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.andWhere('massiveUpload.id = :id', { id: args.id });
        if (GeneralHelper.existsAndNotEmpty(args, 'filename')) query.value.andWhere('massiveUpload.filename LIKE :filename', { filename: `%${args.filename}%` });
    }

}