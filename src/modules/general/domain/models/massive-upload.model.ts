export class MassiveUpload {

    id?: number;
    filename: string;
    user_creator: number;
    status?: boolean;
    created_at?: Date;

    constructor(id: number = null) {
        this.id = id;
    }

}