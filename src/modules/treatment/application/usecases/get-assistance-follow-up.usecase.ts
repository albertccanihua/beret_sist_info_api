import { IResponse } from "src/common/interfaces/response.interface";
import { TreatmentAssistancesRepository } from "../../domain/repository/treatment-assistances.repository";
import { GetAssistanceFollowUpDto } from "../dto/get-assistance-follow-up.dto";
import { IGetAssistanceFollowUpRepositoryResponse } from "../../domain/interfaces/get-assistance-follow-up-repository-response.interface";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";

export class GetAssistanceFollowUpUseCase {

    constructor(
        private readonly treatmentAssistanceRepository: TreatmentAssistancesRepository
    ) { }

    async exec(data: GetAssistanceFollowUpDto): Promise<IResponse<IGetAssistanceFollowUpRepositoryResponse>> {
        try {
            const response = new ResponseHelper();

            const followUp = await this.treatmentAssistanceRepository.getFollowUp({
                profesional: data.profesional,
                date_care: data.date_care
            });

            response.result(followUp);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

}