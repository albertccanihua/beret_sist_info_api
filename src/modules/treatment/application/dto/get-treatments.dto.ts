import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class GetTreatmentsDto {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    code: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    packet: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    patient: number;

    @IsString()
    @IsOptional()
    patient_document_number: string;
}