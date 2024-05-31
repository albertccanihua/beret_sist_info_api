import { BaseRepository } from "src/common/repository/base.repository";
import { Treatment } from "../models/treatment.model";
import { IShowTreatmentRepositoryResponse } from "../interfaces/show-treatment-repository-response.interface";

export interface TreatmentsRepository {

    show(id: any): Promise<IShowTreatmentRepositoryResponse>;
    get(args: any): Promise<Treatment[]>;
    list(args: any): Promise<any>;
    create(data: Treatment): Promise<Treatment>;
    update(id: any, data: Treatment): Promise<Treatment>;
    delete(id: any): Promise<Treatment>;
    getPatientTreatmentCorrelative(patient_id: number, patient_document_number: string):
        Promise<{ correlative: string, number: string }>;

}