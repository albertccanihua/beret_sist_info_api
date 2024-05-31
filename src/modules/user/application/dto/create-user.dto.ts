import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    document_number: string;

    @IsString()
    @IsOptional()
    dob: string;

    @IsString()
    name: string;

    @IsString()
    paternal_surname: string;

    @IsString()
    maternal_lastname: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    phone_number: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

    @IsNumber()
    @IsPositive()
    type_document: number;

    @IsNumber()
    @IsPositive()
    type_gender: number;

    @IsNumber()
    @IsPositive()
    type_role: number;
}