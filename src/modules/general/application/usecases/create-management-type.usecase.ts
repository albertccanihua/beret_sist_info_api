import { IResponse } from "src/common/interfaces/response.interface";
import { ManagementTypesRepository } from "../../domain/repository/management-type.repository";
import { CreateManagementTypeDto } from "../dto/create-management-type.dto";
import { ManagementType } from "../../domain/models/management-type.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { HttpStatus } from "@nestjs/common";

export class CreateManagementTypeUseCase {

    constructor(
        private managementTypesRepository: ManagementTypesRepository
    ) { }

    async exec(data: CreateManagementTypeDto): Promise<IResponse<ManagementType>> {
        try {
            const response = new ResponseHelper();

            const managementType = await this.managementTypesRepository.create({
                code: data.code,
                name: data.name,
                description: data.description,
                data: data.data,
                type: data.type,
                status: data.status
            });

            response.code(HttpStatus.CREATED).result(managementType);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

}