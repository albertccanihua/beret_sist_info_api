import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { TreatmentAssistancesRepositoryImpl } from "../repository/treatment-assistances.repositoryimpl";
import { GetAssistanceFollowUpDto } from "../../application/dto/get-assistance-follow-up.dto";
import { GetAssistanceFollowUpUseCase } from "../../application/usecases/get-assistance-follow-up.usecase";
import { AuthGuard } from "@nestjs/passport";

@Controller('treatment-assistances')
export class TreatmentAssistancesController {

    constructor(
        private readonly treatmentAssistancesRepository: TreatmentAssistancesRepositoryImpl
    ) { }

    @Get('/get/follow-up')
    @UseGuards(AuthGuard())
    getFollowUp(@Query() getAssistanceFollowUpDto) {
        return new GetAssistanceFollowUpUseCase(
            this.treatmentAssistancesRepository
        ).exec(getAssistanceFollowUpDto);
    }
}