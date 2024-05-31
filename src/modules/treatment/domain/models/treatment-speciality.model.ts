import { Speciality } from "src/modules/speciality/domain/models/speciality.model";
import { Treatment } from "./treatment.model";

export class TreatmentSpeciality {
    id?: number;
    sessions: number;
    sessions_taken: number;
    treatment: Treatment;
    speciality: Speciality;

    constructor(id: number = null) {
        this.id = id;
    }
}