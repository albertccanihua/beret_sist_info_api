export class Packet {
    id?: number;
    user_creator: number;
    name: string;
    description?: string;
    code?: string;
    relational_codes?: string;
    status?: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

    constructor(id: number = null) {
        this.id = id;
    }
}