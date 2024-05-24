import { Patient } from "src/modules/patient/domain/models/patient.model";

export class TreatmentRequest {

    id?: string;
    user_creator: string;
    patient: Patient;
    created_at?: Date;

}