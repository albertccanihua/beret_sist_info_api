import { Type } from "class-transformer";
import { IsArray, IsNumber, IsPositive, ValidateNested } from "class-validator";
import { ObjectForUploadingDto } from "./object-for-uploading.dto";

export class UploadDataDto {

    @IsNumber()
    @IsPositive()
    user_creator: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ObjectForUploadingDto)
    items: ObjectForUploadingDto[];

}