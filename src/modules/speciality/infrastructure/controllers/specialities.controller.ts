import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ShowSpecialityUseCase } from "../../application/usercases/show-speciality.usecase";
import { SpecialitiesRepositoryImpl } from "../repository/speciality.repositoryimpl";
import { GetSpecialitiesDto } from "../../application/dto/get-specialities.dto";
import { ShowSpecialityDto } from "../../application/dto/show-speciality.dto";
import { ListSpecialitiesDto } from "../../application/dto/list-specialities.dto";
import { CreateSpecialityDto } from "../../application/dto/create-speciality.dto";
import { UpdateSpecialityDto } from "../../application/dto/update-speciality.dto";
import { DeleteSpecialityDto } from "../../application/dto/delete-speciality.dto";
import { GetSpecialitiesUseCase } from "../../application/usercases/get-specialities.usecase";
import { ListSpecialitiesUseCase } from "../../application/usercases/list-specialities.usecase";
import { CreateSpecialityUseCase } from "../../application/usercases/create-speciality.usecase";
import { UpdateSpecialityUseCase } from "../../application/usercases/update-speciality.usecase";
import { DeleteSpecialityUseCase } from "../../application/usercases/delete-speciality.usecase";
import { AuthGuard } from "@nestjs/passport";

@Controller('specialities')
export class SpecialitiesController {

    constructor(
        private readonly specialitiesRepository: SpecialitiesRepositoryImpl
    ) { }

    @Get('/show/:id')
    @UseGuards(AuthGuard('jwt'))
    show(@Param('id') id: number) {
        return new ShowSpecialityUseCase(this.specialitiesRepository).exec({ id } as ShowSpecialityDto);
    }

    @Get('/get')
    @UseGuards(AuthGuard('jwt'))
    get(@Query() getSpecialitiesDto: GetSpecialitiesDto) {
        return new GetSpecialitiesUseCase(this.specialitiesRepository).exec(getSpecialitiesDto);
    }

    @Get('/list')
    @UseGuards(AuthGuard('jwt'))
    list(@Query() listSpecialitiesDto: ListSpecialitiesDto) {
        return new ListSpecialitiesUseCase(this.specialitiesRepository).exec(listSpecialitiesDto);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createSpecialityDto: CreateSpecialityDto) {
        return new CreateSpecialityUseCase(this.specialitiesRepository).exec(createSpecialityDto);
    }

    @Put()
    @UseGuards(AuthGuard('jwt'))
    update(@Body() updateSpecialityDto: UpdateSpecialityDto) {
        return new UpdateSpecialityUseCase(this.specialitiesRepository).exec(updateSpecialityDto);
    }

    @Delete()
    @UseGuards(AuthGuard('jwt'))
    delete(@Body() deleteSpecialityDto: DeleteSpecialityDto) {
        return new DeleteSpecialityUseCase(this.specialitiesRepository).exec(deleteSpecialityDto);
    }

}