import { IsBoolean, IsEmail, IsOptional, IsString, IsUUID } from "class-validator";

export class CreatePatientDto {

    @IsUUID()
    user_id: string;

    @IsString()
    document_number: string;

    @IsString()
    dob: string;

    @IsString()
    name: string;

    @IsString()
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
    type_document_id: string;

    @IsUUID()
    type_gender_id: string;

    @IsUUID()
    type_financing_id: string;
}