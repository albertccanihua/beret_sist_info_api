import { IResponse } from "src/common/interfaces/response.interface";
import { SpecialitiesRepository } from "../../domain/repository/specialities.repository";
import { DeleteSpecialityDto } from "../dto/delete-speciality.dto";
import { Speciality } from "../../domain/models/speciality.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";

export class DeleteSpecialityUseCase {

    constructor(
        private readonly specialitiesRepository: SpecialitiesRepository
    ) { }

    async exec(data: DeleteSpecialityDto): Promise<IResponse<Speciality>> {
        try {
            const response = new ResponseHelper();

            const speciality = await this.specialitiesRepository.delete(data.id);

            response.result(speciality);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

}