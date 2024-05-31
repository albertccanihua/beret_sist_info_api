import { Controller, Post, UseGuards } from "@nestjs/common";
import { CreateInitialDataDto } from "../../application/dto/create-initial-data.dto";
import { CreateInitialDataUseCase } from "../../application/usecases/create-initial-data.usecase";
import { PacketsRepositoryImpl } from "src/modules/packet/infrastructure/repository/packets.repositoryimpl";
import { SpecialitiesRepositoryImpl } from "src/modules/speciality/infrastructure/repository/speciality.repositoryimpl";
import { PacketSpecialitiesRepositoryImpl } from "src/modules/packet/infrastructure/repository/packet-specialities.repositoryimpl";
import { ManagementTypesRepositoryImpl } from "../repository/management-types.repositoryimpl";
import { ConfigService } from "@nestjs/config";
import { UsersRepositoryImpl } from "src/modules/user/infrastructure/repository/users.repositoryimpl";
import { AuthGuard } from "@nestjs/passport";

@Controller('initial-data')
export class InitialDataController {

    constructor(
        private readonly managementTypesRepository: ManagementTypesRepositoryImpl,
        private readonly usersRepository: UsersRepositoryImpl,
        private readonly packetsRepository: PacketsRepositoryImpl,
        private readonly specialitiesRepository: SpecialitiesRepositoryImpl,
        private readonly packetSpecialitiesRepository: PacketSpecialitiesRepositoryImpl,
        private readonly configService: ConfigService
    ) { }

    @Post()
    @UseGuards(AuthGuard())
    create(data: CreateInitialDataDto) {
        return new CreateInitialDataUseCase(
            this.managementTypesRepository,
            this.usersRepository,
            this.packetsRepository,
            this.specialitiesRepository,
            this.packetSpecialitiesRepository,
            this.configService
        ).exec(data);
    }


}