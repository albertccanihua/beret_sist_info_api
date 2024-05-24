import { IsOptional, IsString, IsUUID } from "class-validator";

export class GetTreatmentsDto {

    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @IsOptional()
    code: string;

    @IsUUID()
    @IsOptional()
    packet: string;

    @IsUUID()
    @IsOptional()
    patient: string;

    @IsString()
    @IsOptional()
    patient_document_number: string;
}