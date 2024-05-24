import { IsUUID } from "class-validator";
import { Patient } from "src/modules/patient/domain/models/patient.model";

export class CreateTreatmentRequestDto {

    @IsUUID()
    user_creator: string;

    @IsUUID()
    patient: Patient;

}