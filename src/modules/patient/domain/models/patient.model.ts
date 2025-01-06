export class Patient {

    id?: number;
    user_creator: number;
    document_number: string;
    medical_history: string;
    dob?: string;
    name: string;
    paternal_surname: string;
    maternal_lastname?: string;
    email?: string;
    phone_number?: string;
    status?: boolean;
    type_document: number;
    type_gender: number;
    type_financing: number;

    constructor(id: number = null) {
        this.id = id;
    }
}