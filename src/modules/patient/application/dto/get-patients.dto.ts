import { IsBoolean, IsEmail, IsOptional, IsString, IsUUID } from "class-validator";

export class GetPatientsDto {

    @IsUUID()
    @IsOptional()
    id: string;

    @IsUUID()
    @IsOptional()
    user_id: string;

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

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    phone_number: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

    @IsUUID()
    @IsOptional()
    type_document_id: string;

    @IsUUID()
    @IsOptional()
    type_gender_id: string;

    @IsUUID()
    @IsOptional()
    type_financing_id: string;

}