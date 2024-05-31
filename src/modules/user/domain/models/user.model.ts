export class User {
    id?: number;
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
    type_document: number;
    type_gender: number;
    type_role: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

    constructor(id: number = null) {
        this.id = id;
    }
}