import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ManagementTypesRepositoryImpl } from "../repository/management-types.repositoryimpl";
import { GetManagementTypesDto } from "../../application/dto/get-management-types.dto";
import { GetManagementTypesUseCase } from "../../application/usecases/get-management-types.usecase";
import { CreateManagementTypeUseCase } from "../../application/usecases/create-management-type.usecase";
import { CreateManagementTypeDto } from "../../application/dto/create-management-type.dto";
import { UpdateManagementTypeDto } from "../../application/dto/update-management-type.dto";
import { UpdateManagementTypeUseCase } from "../../application/usecases/update-management-type.usecase";
import { ListManagementTypesDto } from "../../application/dto/list-management-types.dto";
import { ListManagementTypesUseCase } from "../../application/usecases/list-management-tyeps.usecase";
import { ShowManagementTypeUseCase } from "../../application/usecases/show-management-type.usecase";
import { ShowManagementTypeDto } from "../../application/dto/show-management-type.dto";

@Controller('management-types')
export class ManagementTypesController {

    constructor(
        private readonly managementTypesRepository: ManagementTypesRepositoryImpl
    ) { }

    @Get('/show/:id')
    show(@Param('id') id: string) {
        return new ShowManagementTypeUseCase(this.managementTypesRepository).exec({ id } as ShowManagementTypeDto);
    }

    @Get('/get')
    get(@Query() getManagementTypesDto: GetManagementTypesDto) {
        return new GetManagementTypesUseCase(this.managementTypesRepository).exec(getManagementTypesDto);
    }

    @Get('/list')
    list(@Query() listSpecialitiesDto: ListManagementTypesDto) {
        return new ListManagementTypesUseCase(this.managementTypesRepository).exec(listSpecialitiesDto);
    }

    @Post()
    create(@Body() createManagementTypeDto: CreateManagementTypeDto) {
        return new CreateManagementTypeUseCase(this.managementTypesRepository).exec(createManagementTypeDto);
    }

    @Put()
    update(@Body() updateManagementType: UpdateManagementTypeDto) {
        return new UpdateManagementTypeUseCase(this.managementTypesRepository).exec(updateManagementType);
    }
}