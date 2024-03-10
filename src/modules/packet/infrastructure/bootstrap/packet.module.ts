import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PacketEntity } from "../entities/packet.entity";
import { PacketSpecialityEntity } from "../entities/packet-speciality.entity";
import { PacketsController } from "../controllers/packets.controller";
import { PacketsRepositoryImpl } from "../repository/packets.repositoryimpl";
import { PacketSpecialitiesRepositoryImpl } from "../repository/packet-specialities.repositoryimpl";
import { PacketSpecialitiesController } from "../controllers/packet-specialities.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PacketEntity,
            PacketSpecialityEntity
        ])
    ],
    controllers: [
        PacketsController,
        PacketSpecialitiesController
    ],
    providers: [
        PacketsRepositoryImpl,
        PacketSpecialitiesRepositoryImpl
    ]
})
export class PacketModule { }