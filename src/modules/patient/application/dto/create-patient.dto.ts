import {IsBoolean, IsOptional, IsString, IsUUID} from "class-validator";

export class CreatePatientDto {

    @IsUUID()
    user_creator: string;

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
    @IsOptional()
    maternal_lastname: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    phone_number: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

    @IsUUID()
    type_document: string;

    @IsUUID()
    type_gender: string;

    @IsUUID()
    type_financing: string;
}