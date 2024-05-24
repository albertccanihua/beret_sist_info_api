import { Type } from "class-transformer";
import { IsArray, IsUUID, ValidateNested } from "class-validator";
import { ObjectForUploadingDto } from "./object-for-uploading.dto";

export class UploadDataDto {

    @IsUUID()
    user_creator: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ObjectForUploadingDto)
    items: ObjectForUploadingDto[];

}