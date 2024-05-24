import { BaseRepository } from "src/common/repository/base.repository";
import { TreatmentAssistance } from "../models/treatment-assistance.model";
import { IGetAssistanceFollowUpRepositoryResponse } from "../interfaces/get-assistance-follow-up-repository-response.interface";

export interface TreatmentAssistancesRepository extends BaseRepository<TreatmentAssistance> {

    getFollowUp({ profesional, date_care }): Promise<IGetAssistanceFollowUpRepositoryResponse>;

}