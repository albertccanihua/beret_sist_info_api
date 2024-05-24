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
        super(packetSpecialityRepository, 'packet_speciality', (query, args) => this.customFilters(query, args));
    }

    async get(args: any): Promise<PacketSpeciality[] | any> {
        const packets: PacketSpecialityEntity[] | [] = await this.requestBroker.queryBuilder('packet_speciality')
            .setArgs(args)
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .innerJoinAndSelect('packet_speciality.packet', 'packet')
            .innerJoinAndSelect('packet_speciality.speciality', 'speciality')
            .getMany();
        return packets;
    }

    private customFilters(query: IQueryBuilderRequest<PacketSpecialityEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.andWhere('packet_speciality.id = :id', { id: args.id });
        if (GeneralHelper.existsAndNotEmpty(args, 'packet')) query.value.andWhere('packet_speciality.packet_id = :packet', { packet: args.packet });
        if (GeneralHelper.existsAndNotEmpty(args, 'speciality')) query.value.andWhere('packet_speciality.speciality_id = :speciality', { speciality: args.speciality });
    }
}