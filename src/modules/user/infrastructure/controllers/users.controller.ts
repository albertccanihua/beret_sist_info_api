import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
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
import { ChangePasswordDto } from "../../application/dto/change-password.dto";
import { ChangePasswordUseCase } from "../../application/usecases/change-password.usecase";
import { LoginDto } from "../../application/dto/login.dto";
import { LoginUseCase } from "../../application/usecases/login.usecase";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersRepository: UsersRepositoryImpl,
        private readonly jwtService: JwtService
    ) { }

    @Get('/show/:id')
    @UseGuards(AuthGuard())
    show(@Param('id') id: number) {
        return new ShowUserUseCase(this.usersRepository).exec({ id } as ShowUserDto);
    }

    @Get('/get')
    @UseGuards(AuthGuard())
    get(@Query() getUsersDto: GetUsersDto) {
        return new GetUsersUseCase(this.usersRepository).exec(getUsersDto);
    }

    @Get('/list')
    @UseGuards(AuthGuard())
    list(@Query() listUsersDto: ListUsersDto) {
        return new ListUsersUseCase(this.usersRepository).exec(listUsersDto);
    }

    @Post()
    @UseGuards(AuthGuard())
    create(@Body() createUserDto: CreateUserDto) {
        return new CreateUserUseCase(this.usersRepository).exec(createUserDto);
    }

    @Put()
    @UseGuards(AuthGuard())
    update(@Body() updateUserDto: UpdateUserDto) {
        return new UpdateUserUseCase(this.usersRepository).exec(updateUserDto);
    }

    @Delete()
    @UseGuards(AuthGuard())
    delete(@Body() deleteUserDto: DeleteUserDto) {
        return new DeleteUserUseCase(this.usersRepository).exec(deleteUserDto);
    }

    @Put('/update-password')
    @UseGuards(AuthGuard())
    changePassword(@Body() changePasswordDto: ChangePasswordDto) {
        return new ChangePasswordUseCase(this.usersRepository).exec(changePasswordDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return new LoginUseCase(this.usersRepository, this.jwtService).exec(loginDto);
    }
}