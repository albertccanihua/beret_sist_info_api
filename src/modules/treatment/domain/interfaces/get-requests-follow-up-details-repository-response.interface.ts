export interface IGetRequestFollowUpDetailsRepositoryResponse {
    requests_per_day: RequestsPer[];
    requests_per_month: RequestsPer[];
}

export interface RequestsPer {
    id: number;
    created_at: Date;
    user_creator?: Patient;
    patient: Patient;
}

export interface Patient {
    id: number;
    document_number: string;
    dob: Date;
    name: string;
    paternal_surname: string;
    maternal_lastname: string | null;
    email: null | string;
    phone_number: null;
    status: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    username?: string;
    password?: string;
}

