import { DocumentTypesEnum } from "src/common/enum/document-types.enum";
import { GendersEnum } from "src/common/enum/genders.enum";

export class User {
    id?: string;
    document_type: DocumentTypesEnum;
    document_number: string;
    dob: string;
    name: string;
    lastname: string;
    email?: string;
    phone_number?: string;
    gender: GendersEnum;
    username: string;
    password: string;
    status?: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}