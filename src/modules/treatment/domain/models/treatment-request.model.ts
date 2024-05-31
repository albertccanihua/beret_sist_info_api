import { Patient } from "src/modules/patient/domain/models/patient.model";

export class TreatmentRequest {

    id?: number;
    user_creator: number;
    patient: Patient;
    created_at?: Date;

}