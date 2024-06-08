import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { CreateManyPacketSpecialityDto } from "./create-many-packet-speciality.dto";

export class CreatePacketDto {

    @IsNumber()
    @IsPositive()
    user_creator: number;

    @IsString()
    code: string;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    relational_codes: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateManyPacketSpecialityDto)
    specialities: CreateManyPacketSpecialityDto[];

}