import { Controller, Get, Query } from "@nestjs/common";
import { TreatmentAssistancesRepositoryImpl } from "../repository/treatment-assistances.repositoryimpl";
import { GetAssistanceFollowUpDto } from "../../application/dto/get-assistance-follow-up.dto";
import { GetAssistanceFollowUpUseCase } from "../../application/usecases/get-assistance-follow-up.usecase";

@Controller('treatment-assistances')
export class TreatmentAssistancesController {

    constructor(
        private readonly treatmentAssistancesRepository: TreatmentAssistancesRepositoryImpl
    ) { }

    @Get('/get/follow-up')
    getFollowUp(@Query() getAssistanceFollowUpDto) {
        return new GetAssistanceFollowUpUseCase(
            this.treatmentAssistancesRepository
        ).exec(getAssistanceFollowUpDto);
    }
}