import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { UploadDataDto } from "../../application/dto/upload-data.dto";
import { PatientsRepositoryImpl } from "src/modules/patient/infrastructure/repository/patient.repositoryimpl";
import { ManagementTypesRepositoryImpl } from "../repository/management-types.repositoryimpl";
import { MassiveUploadUseCase } from "../../application/usecases/massive-upload.usecase";
import { PacketsRepositoryImpl } from "src/modules/packet/infrastructure/repository/packets.repositoryimpl";
import { TreatmentsRepositoryImpl } from "src/modules/treatment/infrastructure/repository/treatments.repositoryimpl";
import { TreatmentSpecialitiesRepositoryImpl } from "src/modules/treatment/infrastructure/repository/treatment-specialities.repositoryimpl";
import { TreatmentAssistancesRepositoryImpl } from "src/modules/treatment/infrastructure/repository/treatment-assistances.repositoryimpl";
import { UsersRepositoryImpl } from "src/modules/user/infrastructure/repository/users.repositoryimpl";
import { SpecialitiesRepositoryImpl } from "src/modules/speciality/infrastructure/repository/speciality.repositoryimpl";
import { PacketSpecialitiesRepositoryImpl } from "src/modules/packet/infrastructure/repository/packet-specialities.repositoryimpl";
import { MassiveUploadRepositoryImpl } from "../repository/massive-upload.repositoryimpl";
import { ShowMassiveUploadUseCase } from "../../application/usecases/show-massive-upload.usecase";
import { ShowMassiveUploadDto } from "../../application/dto/show-massive-upload.dto";
import { MassiveUploadItemRepositoryImpl } from "../repository/massive-upload-item.repositoryimpl";
import { AuthGuard } from "@nestjs/passport";
import { GetMassiveUploadsDto } from "../../application/dto/get-massive-uploads.dto";
import { GetMassiveUploadsUseCase } from "../../application/usecases/get-massive-uploads.usecase";

@Controller('massive-upload')
export class UploadDataController {

    constructor(
        private readonly patientsRepository: PatientsRepositoryImpl,
        private readonly usersRepository: UsersRepositoryImpl,
        private readonly managementTypesRepository: ManagementTypesRepositoryImpl,
        private readonly packetsRepository: PacketsRepositoryImpl,
        private readonly packetSpecialitiesRepository: PacketSpecialitiesRepositoryImpl,
        private readonly specialitiesRepository: SpecialitiesRepositoryImpl,
        private readonly treatmentsRepository: TreatmentsRepositoryImpl,
        private readonly treatmentSpecialitiesRepository: TreatmentSpecialitiesRepositoryImpl,
        private readonly treatmentAssisatncesRepository: TreatmentAssistancesRepositoryImpl,
        private readonly massiveUploadRepository: MassiveUploadRepositoryImpl,
        private readonly massiveUploadItemRepository: MassiveUploadItemRepositoryImpl
    ) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    upload(@Body() data: UploadDataDto) {
        return new MassiveUploadUseCase(
            this.patientsRepository,
            this.usersRepository,
            this.managementTypesRepository,
            this.packetsRepository,
            this.packetSpecialitiesRepository,
            this.specialitiesRepository,
            this.treatmentsRepository,
            this.treatmentSpecialitiesRepository,
            this.treatmentAssisatncesRepository,
            this.massiveUploadRepository,
            this.massiveUploadItemRepository
        ).exec(data);
    }

    @Get('/show/:id')
    @UseGuards(AuthGuard('jwt'))
    show(@Param('id') id: number) {
        return new ShowMassiveUploadUseCase(
            this.massiveUploadRepository
        ).exec({ id } as ShowMassiveUploadDto);
    }

    @Get('/get')
    @UseGuards(AuthGuard('jwt'))
    get(@Query() getMassiveUploadsDto: GetMassiveUploadsDto) {
        return new GetMassiveUploadsUseCase(
            this.massiveUploadRepository
        ).exec(getMassiveUploadsDto);
    }
}