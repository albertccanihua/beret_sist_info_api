import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { PacketSpeciality } from "../../domain/models/packet-speciality.model";

export class CreatePacketDto {

    @IsUUID()
    user_id: string;

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
    @Type(() => PacketSpeciality)
    specialities: PacketSpeciality[];

}