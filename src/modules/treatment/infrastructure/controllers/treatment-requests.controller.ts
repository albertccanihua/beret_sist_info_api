import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { TreatmentRequestsRepositoryImpl } from "../repository/treatment-request.repositoryimpl";
import { CreateTreatmentRequestDto } from "../../application/dto/create-treatment-request.dto";
import { CreateTreatmentRequestUseCase } from "../../application/usecases/create-treatment-request.usecase";
import { GetFollowUpUseCase } from "../../application/usecases/get-follow-up.usecase";
import { GetFollowUpDto } from "../../application/dto/get-follow-up.dto";
import { GetRequestsFollowUpDetailsUseCase } from "../../application/usecases/get-requests-follow-up-details.usecase";
import { AuthGuard } from "@nestjs/passport";

@Controller('treatment-requests')
export class TreatmentRequestController {

    constructor(
        private readonly treatmentRequestsRepository: TreatmentRequestsRepositoryImpl
    ) { }

    @Get('/get/follow-up')
    @UseGuards(AuthGuard('jwt'))
    getFollowUp(@Query() getFollowUpDto: GetFollowUpDto) {
        return new GetFollowUpUseCase(
            this.treatmentRequestsRepository
        ).exec(getFollowUpDto);
    }

    @Get('get/follow-up-details')
    @UseGuards(AuthGuard('jwt'))
    getFollowUpDetails(@Query() getFollowUpDetails: GetFollowUpDto) {
        return new GetRequestsFollowUpDetailsUseCase(
            this.treatmentRequestsRepository
        ).exec(getFollowUpDetails);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createTreatmentRequestDto: CreateTreatmentRequestDto) {
        return new CreateTreatmentRequestUseCase(
            this.treatmentRequestsRepository
        ).exec(createTreatmentRequestDto);
    }
}