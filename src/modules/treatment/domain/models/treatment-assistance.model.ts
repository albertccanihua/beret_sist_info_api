import { User } from "src/modules/user/domain/models/user.model";
import { Treatment } from "./treatment.model";
import { TreatmentSpeciality } from "./treatment-speciality.model";

export class TreatmentAssistance {
    id?: number;
    date_appointment?: string;
    date_care: string;
    status: boolean;
    created_at?: Date;
    treatment: Treatment;
    treatment_speciality: TreatmentSpeciality;
    profesional: User;
}