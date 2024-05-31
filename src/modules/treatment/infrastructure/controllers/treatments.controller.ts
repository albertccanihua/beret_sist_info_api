import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { TreatmentsRepositoryImpl } from "../repository/treatments.repositoryimpl";
import { TreatmentSpecialitiesRepositoryImpl } from "../repository/treatment-specialities.repositoryimpl";
import { ManagementTypesRepositoryImpl } from "src/modules/general/infrastructure/repository/management-types.repositoryimpl";
import { GetTreatmentsDto } from "../../application/dto/get-treatments.dto";
import { CreateTreatmentDto } from "../../application/dto/create-treatment.dto";
import { CreateTreatmentUseCase } from "../../application/usecases/create-treatment.usecase";
import { PacketSpecialitiesRepositoryImpl } from "src/modules/packet/infrastructure/repository/packet-specialities.repositoryimpl";
import { GetTreatmentsUseCase } from "../../application/usecases/get-treatments.usecase";
import { ShowTreatmentUseCase } from "../../application/usecases/show-treatment.usecase";
import { AuthGuard } from "@nestjs/passport";

@Controller('treatments')
export class TreatmentsController {

    constructor(
        private readonly treatmentRepository: TreatmentsRepositoryImpl,
        private readonly treatmentSpecialitiesRepository: TreatmentSpecialitiesRepositoryImpl,
        private readonly packetSpecialitiesRepository: PacketSpecialitiesRepositoryImpl,
        private readonly managementTypesRepository: ManagementTypesRepositoryImpl
    ) { }

    @Get('/show/:id')
    @UseGuards(AuthGuard())
    show(@Param('id') id: number) {
        return new ShowTreatmentUseCase(
            this.treatmentRepository
        ).exec({ id });
    }

    @Get('/get')
    @UseGuards(AuthGuard())
    get(@Query() getTreatmentsDto: GetTreatmentsDto) {
        return new GetTreatmentsUseCase(
            this.treatmentRepository
        ).exec(getTreatmentsDto);
    }

    @Post()
    @UseGuards(AuthGuard())
    create(@Body() createTreatmentDto: CreateTreatmentDto) {
        return new CreateTreatmentUseCase(
            this.treatmentRepository,
            this.treatmentSpecialitiesRepository,
            this.packetSpecialitiesRepository,
            this.managementTypesRepository
        ).exec(createTreatmentDto);
    }
}