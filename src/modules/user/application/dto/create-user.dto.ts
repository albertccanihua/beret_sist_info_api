import { IsBoolean, IsEmail, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateUserDto {

    @IsString()
    document_number: string;

    @IsString()
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

    @IsUUID()
    type_document: string;

    @IsUUID()
    type_gender: string;

    @IsUUID()
    type_role: string;
}