import { IResponse } from "src/common/interfaces/response.interface";
import { SpecialitiesRepository } from "../../domain/repository/specialities.repository";
import { ShowSpecialityDto } from "../dto/show-speciality.dto";
import { Speciality } from "../../domain/models/speciality.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";

export class ShowSpecialityUseCase {

    constructor(
        private readonly specialitiesRepository: SpecialitiesRepository
    ) { }

    async exec(data: ShowSpecialityDto): Promise<IResponse<Speciality>> {
        try {
            const response = new ResponseHelper();

            const speciality = await this.specialitiesRepository.show(data.id);
            response.result(speciality);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}