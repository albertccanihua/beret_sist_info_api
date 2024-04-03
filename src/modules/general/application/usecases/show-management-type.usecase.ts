import { IResponse } from "src/common/interfaces/response.interface";
import { ManagementTypesRepository } from "../../domain/repository/management-type.repository";
import { ShowManagementTypeDto } from "../dto/show-management-type.dto";
import { ManagementType } from "../../domain/models/management-type.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { NotFoundException } from "@nestjs/common";

export class ShowManagementTypeUseCase {

    constructor(
        private managementTypesRepository: ManagementTypesRepository
    ) { }

    async exec(data: ShowManagementTypeDto): Promise<IResponse<ManagementType>> {
        try {
            const response = new ResponseHelper();

            const managementType = await this.managementTypesRepository.show(data.id);

            if (!managementType) throw new NotFoundException('Management type not found');
            response.result(managementType);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}