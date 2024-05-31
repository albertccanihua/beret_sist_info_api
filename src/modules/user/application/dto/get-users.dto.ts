import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class GetUsersDto {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    document_number: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    paternal_surname: string;

    @IsString()
    @IsOptional()
    maternal_lastname: string;

    @IsString()
    @IsOptional()
    username: string;

    @IsBoolean()
    @IsOptional()
    status: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    type_document: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    type_role: number;
}