import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { TreatmentsRepositoryImpl } from "../repository/treatments.repositoryimpl";
import { TreatmentSpecialitiesRepositoryImpl } from "../repository/treatment-specialities.repositoryimpl";
import { ManagementTypesRepositoryImpl } from "src/modules/general/infrastructure/repository/management-types.repositoryimpl";
import { GetTreatmentsDto } from "../../application/dto/get-treatments.dto";
import { CreateTreatmentDto } from "../../application/dto/create-treatment.dto";
import { CreateTreatmentUseCase } from "../../application/usecases/create-treatment.usecase";
import { PacketSpecialitiesRepositoryImpl } from "src/modules/packet/infrastructure/repository/packet-specialities.repositoryimpl";
import { GetTreatmentsUseCase } from "../../application/usecases/get-treatments.usecase";
import { ShowTreatmentUseCase } from "../../application/usecases/show-treatment.usecase";

@Controller('treatments')
export class TreatmentsController {

    constructor(
        private readonly treatmentRepository: TreatmentsRepositoryImpl,
        private readonly treatmentSpecialitiesRepository: TreatmentSpecialitiesRepositoryImpl,
        private readonly packetSpecialitiesRepository: PacketSpecialitiesRepositoryImpl,
        private readonly managementTypesRepository: ManagementTypesRepositoryImpl
    ) { }

    @Get('/show/:id')
    show(@Param('id') id: string) {
        return new ShowTreatmentUseCase(
            this.treatmentRepository
        ).exec({ id });
    }

    @Get('/get')
    get(@Query() getTreatmentsDto: GetTreatmentsDto) {
        return new GetTreatmentsUseCase(
            this.treatmentRepository
        ).exec(getTreatmentsDto);
    }

    @Post()
    create(@Body() createTreatmentDto: CreateTreatmentDto) {
        return new CreateTreatmentUseCase(
            this.treatmentRepository,
            this.treatmentSpecialitiesRepository,
            this.packetSpecialitiesRepository,
            this.managementTypesRepository
        ).exec(createTreatmentDto);
    }
}