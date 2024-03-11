import { Injectable } from "@nestjs/common";
import { PacketSpeciality } from "../../domain/models/packet-speciality.model";
import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";
import { PacketSpecialityEntity } from "../entities/packet-speciality.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { GeneralHelper } from "src/common/helpers/general.helper";

@Injectable()
export class PacketSpecialitiesRepositoryImpl extends BaseRepositoryImpl<PacketSpecialityEntity, PacketSpeciality> {

    constructor(
        @InjectRepository(PacketSpecialityEntity)
        protected packetSpecialityRepository: Repository<PacketSpecialityEntity>
    ) {
        super(packetSpecialityRepository, 'packet-speciality', (query, args) => this.customFilters(query, args));
    }

    private customFilters(query: IQueryBuilderRequest<PacketSpecialityEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.where('id = :id', { id: args.id });
    }
}