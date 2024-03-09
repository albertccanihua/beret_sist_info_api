import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "../../application/dto/create-user.dto";
import { CreateUserUseCase } from "../../application/usecases/create-user.usecase";
import { UsersRepositoryImpl } from "../repository/users.repositoryimpl";
import { ShowUserDto } from "../../application/dto/show-user.dto";
import { ShowUserUseCase } from "../../application/usecases/show-user.usecase";
import { GetUsersUseCase } from "../../application/usecases/get-users.usecase";
import { GetUsersDto } from "../../application/dto/get-users.dto";
import { ListUsersUseCase } from "../../application/usecases/list-users.usecase";
import { ListUsersDto } from "../../application/dto/list-users.dto";
import { UpdateUserDto } from "../../application/dto/update-user.dto";
import { UpdateUserUseCase } from "../../application/usecases/update-user.usecase";
import { DeleteUserUseCase } from "../../application/usecases/delete-user.usecase";
import { DeleteUserDto } from "../../application/dto/delete-user.dto";

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersRepository: UsersRepositoryImpl
    ) { }

    @Get('/show/:id')
    show(@Param('id') id: string) {
        return new ShowUserUseCase(this.usersRepository).exec({ id } as ShowUserDto);
    }

    @Get('/get')
    get(@Query() getUsersDto: GetUsersDto) {
        return new GetUsersUseCase(this.usersRepository).exec(getUsersDto);
    }

    @Get('/list')
    @UsePipes(ValidationPipe)
    list(@Query() listUsersDto: ListUsersDto) {
        return new ListUsersUseCase(this.usersRepository).exec(listUsersDto);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return new CreateUserUseCase(this.usersRepository).exec(createUserDto);
    }

    @Put()
    update(@Body() updateUserDto: UpdateUserDto) {
        return new UpdateUserUseCase(this.usersRepository).exec(updateUserDto);
    }

    @Delete()
    delete(@Body() deleteUserDto: DeleteUserDto) {
        return new DeleteUserUseCase(this.usersRepository).exec(deleteUserDto);
    }
}