import { Type } from "class-transformer";
import { IsArray, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";
import { ObjectForUploadingDto } from "./object-for-uploading.dto";

export class UploadDataDto {

    @IsNumber()
    @IsPositive()
    user_creator: number;

    @IsString()
    filename: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ObjectForUploadingDto)
    items: ObjectForUploadingDto[];

}