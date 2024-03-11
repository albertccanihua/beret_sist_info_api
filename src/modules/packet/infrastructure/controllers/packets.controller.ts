import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { PacketsRepositoryImpl } from "../repository/packets.repositoryimpl";
import { ShowPacketUseCase } from "../../application/usecases/show-packet.usecase";
import { GetPacketsDto } from "../../application/dto/get-packets.dto";
import { GetPacketsUseCase } from "../../application/usecases/get-packets.usecase";
import { ShowPacketDto } from "../../application/dto/show-packet.dto";
import { ListPacketsDto } from "../../application/dto/list-packets.dto";
import { ListPacketsUseCase } from "../../application/usecases/list-packets.usecase";
import { CreatePacketDto } from "../../application/dto/create-packet.dto";
import { CreatePacketUseCase } from "../../application/usecases/create-packet.usecase";
import { UpdatePacketDto } from "../../application/dto/update-packet.dto";
import { UpdatePacketUseCase } from "../../application/usecases/update-packet.usecase";
import { DeletePacketDto } from "../../application/dto/delete-packet.dto";
import { DeletePacketUseCase } from "../../application/usecases/delete-packet.usecase";
import { PacketSpecialitiesRepositoryImpl } from "../repository/packet-specialities.repositoryimpl";

@Controller('packets')
export class PacketsController {

    constructor(
        private readonly packetsRepository: PacketsRepositoryImpl,
        private readonly packetSpecialitiesRepository: PacketSpecialitiesRepositoryImpl
    ) { }

    @Get('/show/:id')
    show(@Param('id') id: string) {
        return new ShowPacketUseCase(this.packetsRepository).exec({ id } as ShowPacketDto);
    }

    @Get('/get')
    get(@Query() getPacketsDto: GetPacketsDto) {
        return new GetPacketsUseCase(this.packetsRepository).exec(getPacketsDto);
    }

    @Get('/list')
    list(@Query() listPacketsDto: ListPacketsDto) {
        return new ListPacketsUseCase(this.packetsRepository).exec(listPacketsDto);
    }

    @Post()
    create(@Body() createPacketDto: CreatePacketDto) {
        return new CreatePacketUseCase(
            this.packetsRepository,
            this.packetSpecialitiesRepository
        ).exec(createPacketDto);
    }

    @Put()
    update(@Body() updatePacketDto: UpdatePacketDto) {
        return new UpdatePacketUseCase(
            this.packetsRepository,
            this.packetSpecialitiesRepository
        ).exec(updatePacketDto);
    }

    @Delete()
    delete(@Body() deletePacketDto: DeletePacketDto) {
        return new DeletePacketUseCase(this.packetsRepository).exec(deletePacketDto);
    }

}