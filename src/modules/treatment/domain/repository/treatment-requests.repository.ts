import { BaseRepository } from "src/common/repository/base.repository";
import { TreatmentRequest } from "../models/treatment-request.model";
import { IGetFollowUpRepositoryResponse } from "../interfaces/get-follow-up-repository-response.interface";
import { IGetRequestFollowUpDetailsRepositoryResponse } from "../interfaces/get-requests-follow-up-details-repository-response.interface";

export interface TreatementRequestsRepository extends BaseRepository<TreatmentRequest> {

    getFollowUp({ user_creator, created_at }): Promise<IGetFollowUpRepositoryResponse>;
    getFollowUpDetails({ user_creator, created_at }): Promise<IGetRequestFollowUpDetailsRepositoryResponse>;

}