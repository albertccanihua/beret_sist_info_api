import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateManyPacketSpecialityDto } from "./create-many-packet-speciality.dto";

export class CreatePacketDto {

    @IsUUID()
    user_creator: string;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateManyPacketSpecialityDto)
    specialities: CreateManyPacketSpecialityDto[];

}