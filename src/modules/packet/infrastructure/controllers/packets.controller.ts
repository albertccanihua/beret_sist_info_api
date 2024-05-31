import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
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
import { AuthGuard } from "@nestjs/passport";

@Controller('packets')
export class PacketsController {

    constructor(
        private readonly packetsRepository: PacketsRepositoryImpl,
        private readonly packetSpecialitiesRepository: PacketSpecialitiesRepositoryImpl
    ) { }

    @Get('/show/:id')
    @UseGuards(AuthGuard())
    show(@Param('id') id: number) {
        return new ShowPacketUseCase(this.packetsRepository).exec({ id } as ShowPacketDto);
    }

    @Get('/get')
    @UseGuards(AuthGuard())
    get(@Query() getPacketsDto: GetPacketsDto) {
        return new GetPacketsUseCase(this.packetsRepository).exec(getPacketsDto);
    }

    @Get('/list')
    @UseGuards(AuthGuard())
    list(@Query() listPacketsDto: ListPacketsDto) {
        return new ListPacketsUseCase(this.packetsRepository).exec(listPacketsDto);
    }

    @Post()
    @UseGuards(AuthGuard())
    create(@Body() createPacketDto: CreatePacketDto) {
        return new CreatePacketUseCase(
            this.packetsRepository,
            this.packetSpecialitiesRepository
        ).exec(createPacketDto);
    }

    @Put()
    @UseGuards(AuthGuard())
    update(@Body() updatePacketDto: UpdatePacketDto) {
        return new UpdatePacketUseCase(
            this.packetsRepository,
            this.packetSpecialitiesRepository
        ).exec(updatePacketDto);
    }

    @Delete()
    @UseGuards(AuthGuard())
    delete(@Body() deletePacketDto: DeletePacketDto) {
        return new DeletePacketUseCase(this.packetsRepository).exec(deletePacketDto);
    }

}