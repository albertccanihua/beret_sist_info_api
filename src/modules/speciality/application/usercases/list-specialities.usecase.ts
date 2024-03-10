import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { IResponse } from "src/common/interfaces/response.interface";
import { IQueryBuilderPaginatedResponse } from "src/common/packages/request-broker/interfaces/query-builder-response-paginated.interface";
import { Speciality } from "../../domain/models/speciality.model";
import { ListSpecialitiesDto } from "../dto/list-specialities.dto";
import { SpecialitiesRepository } from "../../domain/repository/specialities.repository";

export class ListSpecialitiesUseCase {

    constructor(
        private readonly specialititesRepository: SpecialitiesRepository
    ) { }

    async exec(data: ListSpecialitiesDto): Promise<IResponse<IQueryBuilderPaginatedResponse<Speciality>>> {
        try {
            const response = new ResponseHelper();

            const specialities = await this.specialititesRepository.list(data);
            response.result(specialities);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

}