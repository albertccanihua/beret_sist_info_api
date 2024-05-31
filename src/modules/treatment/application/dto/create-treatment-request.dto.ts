import { IsNumber, IsPositive } from "class-validator";
import { Patient } from "src/modules/patient/domain/models/patient.model";

export class CreateTreatmentRequestDto {

    @IsNumber()
    @IsPositive()
    user_creator: number;

    @IsNumber()
    @IsPositive()
    patient: Patient;

}