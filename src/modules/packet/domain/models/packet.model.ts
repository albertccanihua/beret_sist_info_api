export class Packet {
    id?: string;
    user_creator: string;
    name: string;
    description?: string;
    status?: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}