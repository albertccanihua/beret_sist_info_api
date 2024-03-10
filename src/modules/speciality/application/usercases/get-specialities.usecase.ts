import { IResponse } from "src/common/interfaces/response.interface";
import { SpecialitiesRepository } from "../../domain/repository/specialities.repository";
import { GetSpecialitiesDto } from "../dto/get-specialities.dto";
import { Speciality } from "../../domain/models/speciality.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";

export class GetSpecialitiesUseCase {

    constructor(
        private readonly specialitiesRepository: SpecialitiesRepository
    ) { }

    async exec(data: GetSpecialitiesDto): Promise<IResponse<Speciality[]>> {
        try {
            const response = new ResponseHelper();

            const specialities = await this.specialitiesRepository.get(data);
            response.result(specialities);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}