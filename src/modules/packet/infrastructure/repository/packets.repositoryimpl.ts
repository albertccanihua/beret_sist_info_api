import { Injectable } from "@nestjs/common";
import { Packet } from "../../domain/models/packet.model";
import { PacketEntity } from "../entities/packet.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IQueryBuilderRequest } from "src/common/packages/request-broker/interfaces/query-builder-request.interface";
import { GeneralHelper } from "src/common/helpers/general.helper";
import { BaseRepositoryImpl } from "src/common/repository/base.repositoryimpl";
import { RelationshipHelper } from "src/common/helpers/relationship.helper";

@Injectable()
export class PacketsRepositoryImpl extends BaseRepositoryImpl<PacketEntity, Packet> {

    constructor(
        @InjectRepository(PacketEntity)
        private packetRepository: Repository<PacketEntity>
    ) {
        super(packetRepository, 'packet', (query, args) => this.customFilters(query, args));
    }

    async show(id: any): Promise<Packet | null> {
        const packet: PacketEntity | null = await this.requestBroker.queryBuilder('packet')
            .setArgs({ id })
            .applyFilters((query, args) => this.customFilters(query, args))
            .getInstance()
            .leftJoinAndSelect('packet.user_creator', 'user_creator')
            .leftJoinAndSelect('packet.packet_specialities', 'packet_specialities')
            .leftJoinAndSelect('packet_specialities.speciality', 'speciality')
            .select([
                'packet',
                ...RelationshipHelper.userCreator(),
                'packet_specialities',
                'speciality.id',
                'speciality.code',
                'speciality.name',
            ])
            .getOne();

        if (!packet) return null;
        return packet;
    }

    private customFilters(query: IQueryBuilderRequest<PacketEntity>, args: any): void {
        if (GeneralHelper.existsAndNotEmpty(args, 'id')) query.value.andWhere('packet.id = :id', { id: args.id });
        if (GeneralHelper.existsAndNotEmpty(args, 'name')) query.value.andWhere('packet.name LIKE :name', { name: `%${args.name}%` });
        if (GeneralHelper.existsAndNotEmpty(args, 'code')) query.value.andWhere('packet.code = :code', { code: args.code });
        if (GeneralHelper.existsBoolean(args, 'status')) query.value.andWhere('packet.status = :status', { status: args.status });
    }

}