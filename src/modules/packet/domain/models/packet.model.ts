export class Packet {
    id?: string;
    user_creator: string;
    name: string;
    description?: string;
    code?: string;
    relational_codes?: string;
    status?: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

    constructor(id: string = '') {
        this.id = id;
    }
}