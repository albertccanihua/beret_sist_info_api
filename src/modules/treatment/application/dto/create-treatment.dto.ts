import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Packet } from "src/modules/packet/domain/models/packet.model";
import { Patient } from "src/modules/patient/domain/models/patient.model";

export class CreateTreatmentDto {

    @IsUUID()
    user_creator: string;

    @IsString()
    @MaxLength(100)
    @IsOptional()
    name: string;   

    @IsUUID()
    packet: Packet;

    @IsUUID()
    patient: Patient;

    @IsString()
    patient_document_number: string;

}