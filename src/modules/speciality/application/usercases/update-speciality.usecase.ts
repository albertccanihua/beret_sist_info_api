import { IResponse } from "src/common/interfaces/response.interface";
import { SpecialitiesRepository } from "../../domain/repository/specialities.repository";
import { UpdateSpecialityDto } from "../dto/update-speciality.dto";
import { Speciality } from "../../domain/models/speciality.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";

export class UpdateSpecialityUseCase {

    constructor(
        private readonly specialitiesRepository: SpecialitiesRepository
    ) { }

    async exec(data: UpdateSpecialityDto): Promise<IResponse<Speciality>> {
        try {
            const response = new ResponseHelper();

            const speciality = await this.specialitiesRepository.update(data.id, {
                user_id: data.user_id,
                code: data.code,
                name: data.name,
                description: data.description
            });

            response.result(speciality);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}