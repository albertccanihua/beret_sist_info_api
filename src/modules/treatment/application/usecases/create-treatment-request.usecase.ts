import { IResponse } from "src/common/interfaces/response.interface";
import { CreateTreatmentRequestDto } from "../dto/create-treatment-request.dto";
import { TreatementRequestsRepository } from "../../domain/repository/treatment-requests.repository";
import { TreatmentRequest } from "../../domain/models/treatment-request.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { HttpStatus } from "@nestjs/common";

export class CreateTreatmentRequestUseCase {

    constructor(
        private readonly treatmentRequestRepository: TreatementRequestsRepository
    ) { }

    async exec(data: CreateTreatmentRequestDto): Promise<IResponse<TreatmentRequest>> {
        try {
            const response = new ResponseHelper();

            const treatmentRequest = await this.treatmentRequestRepository.create({
                user_creator: data.user_creator,
                patient: data.patient
            });

            response.code(HttpStatus.CREATED).result(treatmentRequest);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

}