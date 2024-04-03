import { Injectable } from "@nestjs/common";
import { Packet } from "../../domain/models/packet.model";
import { PacketEntity } from "../entities/packet.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { GeneralHelper } from "src/common/helpers/general.helper";
import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";

@Injectable()
export class PacketsRepositoryImpl extends BaseRepositoryImpl<PacketEntity, Packet> {

    constructor(
        @InjectRepository(PacketEntity)
        private packetRepository: Repository<PacketEntity>
    ) {
        super(packetRepository, 'packet', (query, args) => this.customFilters(query, args));
    }

    async show(id: any): Promise<Packet | null> {
        try {
            const packet: PacketEntity | null = await this.requestBroker.queryBuilder('packet')
                .getInstance()
                .leftJoinAndSelect('packet.packet_specialities', 'packet_speciality')
                .innerJoinAndSelect('packet_speciality.speciality', 'speciality')
                .innerJoinAndSelect('speciality.user_creator_id', 'user')
                .where('packet.id = :id', { id: id })
                .getOne();

            if (!packet) return null;
            return packet;
        } catch (error) {
            console.log(error);
        }
    }

    private customFilters(query: IQueryBuilderRequest<PacketEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.where('id = :id', { id: args.id });
    }

}