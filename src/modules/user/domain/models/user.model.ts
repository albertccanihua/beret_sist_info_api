import { DocumentTypesEnum } from "src/common/enum/document-types.enum";
import { GendersEnum } from "src/common/enum/genders.enum";
import { RolesEnum } from "src/common/enum/roles.enum";

export class User {
    id?: string;
    document_type: DocumentTypesEnum;
    document_number: string;
    dob: string;
    name: string;
    paternal_surname: string;
    maternal_lastname?: string;
    email?: string;
    phone_number?: string;
    gender: GendersEnum;
    role: RolesEnum;
    username: string;
    password: string;
    status?: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}