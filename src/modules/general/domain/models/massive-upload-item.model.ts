import { MassiveUpload } from "./massive-upload.model";

export class MassiveUploadItem {

    id?: number;
    item: string;
    reason: string;
    status: boolean;
    massive_upload: MassiveUpload
    created_at?: Date;

}