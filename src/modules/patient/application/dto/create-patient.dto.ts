import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreatePatientDto {

    @IsNumber()
    @IsPositive()
    user_creator: number;

    @IsString()
    document_number: string;

    @IsString()
    medical_history: string;

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

    @IsNumber()
    @IsPositive()
    type_document: number;

    @IsNumber()
    @IsPositive()
    type_gender: number;

    @IsNumber()
    @IsPositive()
    type_financing: number;
}