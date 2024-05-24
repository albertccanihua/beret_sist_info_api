import { Body, Controller, Post } from "@nestjs/common";
import { UploadDataDto } from "../../application/dto/upload-data.dto";
import { PatientsRepositoryImpl } from "src/modules/patient/infrastructure/repository/patient.repositoryimpl";
import { ManagementTypesRepositoryImpl } from "../repository/management-types.repositoryimpl";
import { UploadDataUseCase } from "../../application/usecases/upload-data.usecase";
import { PacketsRepositoryImpl } from "src/modules/packet/infrastructure/repository/packets.repositoryimpl";
import { TreatmentsRepositoryImpl } from "src/modules/treatment/infrastructure/repository/treatments.repositoryimpl";
import { TreatmentSpecialitiesRepositoryImpl } from "src/modules/treatment/infrastructure/repository/treatment-specialities.repositoryimpl";
import { TreatmentAssistancesRepositoryImpl } from "src/modules/treatment/infrastructure/repository/treatment-assistances.repositoryimpl";
import { UsersRepositoryImpl } from "src/modules/user/infrastructure/repository/users.repositoryimpl";
import { SpecialitiesRepositoryImpl } from "src/modules/speciality/infrastructure/repository/speciality.repositoryimpl";
import { PacketSpecialitiesRepositoryImpl } from "src/modules/packet/infrastructure/repository/packet-specialities.repositoryimpl";

@Controller('upload-data')
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
        private readonly treatmentAssisatncesRepository: TreatmentAssistancesRepositoryImpl
    ) { }

    @Post()
    upload(@Body() data: UploadDataDto) {
        return new UploadDataUseCase(
            this.patientsRepository,
            this.usersRepository,
            this.managementTypesRepository,
            this.packetsRepository,
            this.packetSpecialitiesRepository,
            this.specialitiesRepository,
            this.treatmentsRepository,
            this.treatmentSpecialitiesRepository,
            this.treatmentAssisatncesRepository
        ).exec(data);
    }
}