import { IResponse } from "src/common/interfaces/response.interface";
import { ManagementTypesRepository } from "../../domain/repository/management-type.repository";
import { GetManagementTypesDto } from "../dto/get-management-types.dto";
import { ManagementType } from "../../domain/models/management-type.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";

export class GetManagementTypesUseCase {

    constructor(
        private managementTypesRepository: ManagementTypesRepository
    ) { }

    async exec(data: GetManagementTypesDto): Promise<IResponse<ManagementType[]>> {
        try {
            const response = new ResponseHelper();

            const managementTypes = await this.managementTypesRepository.get(data);
            response.result(managementTypes);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}