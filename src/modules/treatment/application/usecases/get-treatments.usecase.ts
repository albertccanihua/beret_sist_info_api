import {IResponse} from "src/common/interfaces/response.interface";
import {TreatmentsRepository} from "../../domain/repository/treatments.repository";
import {GetTreatmentsDto} from "../dto/get-treatments.dto";
import {Treatment} from "../../domain/models/treatment.model";
import {HandleExceptionHelper} from "src/common/helpers/handle-exception.helper";
import {ResponseHelper} from "src/common/helpers/response.helper";

export class GetTreatmentsUseCase {

    constructor(
        private readonly treatmentsRepository: TreatmentsRepository
    ) {
    }

    async exec(data: GetTreatmentsDto): Promise<IResponse<Treatment>> {
        try {
            const response = new ResponseHelper();

            const packets = await this.treatmentsRepository.get(data);

            response.result(packets);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}