import { IResponse } from "src/common/interfaces/response.interface";
import { TreatmentsRepository } from "../../domain/repository/treatments.repository";
import { ShowTreatmentDto } from "../dto/show-treatment.dto";
import { Treatment } from "../../domain/models/treatment.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { NotFoundException } from "@nestjs/common";

export class ShowTreatmentUseCase {

    constructor(
        private readonly treatmentsRepository: TreatmentsRepository
    ) { }

    async exec(data: ShowTreatmentDto): Promise<IResponse<Treatment>> {
        try {
            const response = new ResponseHelper();

            const treatment = await this.treatmentsRepository.show(data.id);
            if (treatment === null) throw new NotFoundException('Treatment not found');

            let sessions = 0;
            let sessionsTaken = 0;

            treatment.treatment_specialities.forEach((speciality) => {
                sessions += speciality.sessions;
                sessionsTaken += speciality.sessions_taken;
            })

            treatment.acceptance_rate = Number(((sessionsTaken / sessions) * 100).toFixed(2));

            response.result(treatment);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

}