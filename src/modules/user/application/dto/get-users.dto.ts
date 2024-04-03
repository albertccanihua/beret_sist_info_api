import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class GetUsersDto {

    @IsUUID()
    @IsOptional()
    id: string;

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

    @IsUUID()
    @IsOptional()
    type_document: string;

    @IsUUID()
    @IsOptional()
    type_role: string;
}