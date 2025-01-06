import { IsBoolean, IsEmail, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { PaginateDto } from "src/common/dto/paginate.dto";

export class ListPatientsDto extends PaginateDto {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    id: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    user_creator: number;

    @IsString()
    @IsOptional()
    document_number: string;

    @IsString()
    @IsOptional()
    medical_history: string;

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

    @IsNumber()
    @IsPositive()
    @IsOptional()
    type_document: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    type_gender: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    type_financing: number;

}