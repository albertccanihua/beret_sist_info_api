export class User {
    id?: string;
    document_number: string;
    dob: string;
    name: string;
    paternal_surname: string;
    maternal_lastname?: string;
    email?: string;
    phone_number?: string;
    username: string;
    password: string;
    status?: boolean;
    type_document: string;
    type_gender: string;
    type_role: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}