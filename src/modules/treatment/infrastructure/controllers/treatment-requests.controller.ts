import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { TreatmentRequestsRepositoryImpl } from "../repository/treatment-request.repositoryimpl";
import { CreateTreatmentRequestDto } from "../../application/dto/create-treatment-request.dto";
import { CreateTreatmentRequestUseCase } from "../../application/usecases/create-treatment-request.usecase";
import { GetFollowUpUseCase } from "../../application/usecases/get-follow-up.usecase";
import { GetFollowUpDto } from "../../application/dto/get-follow-up.dto";
import { GetRequestsFollowUpDetailsUseCase } from "../../application/usecases/get-requests-follow-up-details.usecase";

@Controller('treatment-requests')
export class TreatmentRequestController {

    constructor(
        private readonly treatmentRequestsRepository: TreatmentRequestsRepositoryImpl
    ) { }

    @Get('/get/follow-up')
    getFollowUp(@Query() getFollowUpDto: GetFollowUpDto) {
        return new GetFollowUpUseCase(
            this.treatmentRequestsRepository
        ).exec(getFollowUpDto);
    }

    @Get('get/follow-up-details')
    getFollowUpDetails(@Query() getFollowUpDetails: GetFollowUpDto) {
        return new GetRequestsFollowUpDetailsUseCase(
            this.treatmentRequestsRepository
        ).exec(getFollowUpDetails);
    }

    @Post()
    create(@Body() createTreatmentRequestDto: CreateTreatmentRequestDto) {
        return new CreateTreatmentRequestUseCase(
            this.treatmentRequestsRepository
        ).exec(createTreatmentRequestDto);
    }
}