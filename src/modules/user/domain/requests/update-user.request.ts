export interface UpdateUserRequest {
    document_number: string;
    dob: string;
    name: string;
    paternal_surname: string;
    maternal_lastname: string;
    email: string;
    phone_number: string;
    type_document: number;
    type_gender: number;
    type_role: number;
}