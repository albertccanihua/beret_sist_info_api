import { Speciality } from "src/modules/speciality/domain/models/speciality.model";
import { Treatment } from "./treatment.model";

export class TreatmentSpeciality {
    id?: string;
    sessions: number;
    sessions_taken: number;
    treatment: Treatment;
    speciality: Speciality;

    constructor(id: string = '') {
        this.id = id;
    }
}