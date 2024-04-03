import { IResponse } from "src/common/interfaces/response.interface";
import { SpecialitiesRepository } from "../../domain/repository/specialities.repository";
import { CreateSpecialityDto } from "../dto/create-speciality.dto";
import { Speciality } from "../../domain/models/speciality.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { HttpStatus } from "@nestjs/common";

export class CreateSpecialityUseCase {

    constructor(
        private readonly specialitiesRepository: SpecialitiesRepository
    ) { }

    async exec(data: CreateSpecialityDto): Promise<IResponse<Speciality>> {
        try {
            const response = new ResponseHelper();

            const speciality = await this.specialitiesRepository.create({
                user_creator: data.user_creator,
                code: data.code,
                name: data.name,
                description: data.description,
                status: data.status
            });

            response.code(HttpStatus.CREATED).result(speciality);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}