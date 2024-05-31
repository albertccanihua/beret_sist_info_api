import { IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";
import { Packet } from "src/modules/packet/domain/models/packet.model";
import { Patient } from "src/modules/patient/domain/models/patient.model";

export class CreateTreatmentDto {

    @IsNumber()
    @IsPositive()
    user_creator: number;

    @IsString()
    @MaxLength(100)
    @IsOptional()
    name: string;

    @IsNumber()
    @IsPositive()
    packet: Packet;

    @IsNumber()
    @IsPositive()
    patient: Patient;

    @IsString()
    patient_document_number: string;

}