import { IResponse } from "src/common/interfaces/response.interface";
import { ManagementTypesRepository } from "../../domain/repository/management-type.repository";
import { ManagementType } from "../../domain/models/management-type.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { UpdateManagementTypeDto } from "../dto/update-management-type.dto";
import { NotFoundException } from "@nestjs/common";

export class UpdateManagementTypeUseCase {

    constructor(
        private readonly managementTypesRepository: ManagementTypesRepository
    ) { }

    async exec(data: UpdateManagementTypeDto): Promise<IResponse<ManagementType>> {
        try {
            const response = new ResponseHelper();

            const managementType = await this.managementTypesRepository.update(data.id, {
                code: data.code,
                name: data.name,
                description: data.description,
                data: data.data,
                type: data.type,
                status: data.status
            });

            if (!managementType) throw new NotFoundException('Management type not found');

            response.result(managementType);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}