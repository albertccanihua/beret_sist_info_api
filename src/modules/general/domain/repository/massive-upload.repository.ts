import { BaseRepository } from "src/common/repository/base.repository";
import { MassiveUploadItem } from "../models/massive-upload-item.model";
import { MassiveUpload } from "../models/massive-upload.model";

export interface MassiveUploadRepository extends BaseRepository<MassiveUpload> { }