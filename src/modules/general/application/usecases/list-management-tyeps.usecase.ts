import { IResponse } from "src/common/interfaces/response.interface";
import { ManagementTypesRepository } from "../../domain/repository/management-type.repository";
import { ListManagementTypesDto } from "../dto/list-management-types.dto";
import { ManagementType } from "../../domain/models/management-type.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";

export class ListManagementTypesUseCase {

    constructor(
        private managementTypesRepository: ManagementTypesRepository
    ) { }

    async exec(data: ListManagementTypesDto): Promise<IResponse<ManagementType[]>> {
        try {
            const response = new ResponseHelper();

            const managementTypes = await this.managementTypesRepository.list(data);
            response.result(managementTypes);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

}