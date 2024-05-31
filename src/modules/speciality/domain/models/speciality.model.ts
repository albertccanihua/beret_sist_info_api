export class Speciality {
    id?: number;
    user_creator: number;
    code: string;
    name: string;
    description?: string;
    status?: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

    constructor(id: number = null) {
        this.id = id;
    }
}