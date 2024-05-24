import { IResponse } from "src/common/interfaces/response.interface";
import { TreatementRequestsRepository } from "../../domain/repository/treatment-requests.repository";
import { GetFollowUpDto } from "../dto/get-follow-up.dto";
import { IGetFollowUpRepositoryResponse } from "../../domain/interfaces/get-follow-up-repository-response.interface";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";

export class GetFollowUpUseCase {


    constructor(
        private readonly treatmentRequestRepository: TreatementRequestsRepository
    ) { }

    async exec(data: GetFollowUpDto): Promise<IResponse<IGetFollowUpRepositoryResponse>> {
        try {
            const response = new ResponseHelper();

            const followUp = await this.treatmentRequestRepository.getFollowUp({
                user_creator: data.user_creator,
                created_at: data.created_at
            });

            response.result(followUp);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}