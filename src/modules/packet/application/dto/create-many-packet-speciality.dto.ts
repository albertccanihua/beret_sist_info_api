import { IsInt, IsOptional, IsPositive, IsUUID } from "class-validator";
import { Speciality } from "src/modules/speciality/domain/models/speciality.model";

export class CreateManyPacketSpecialityDto {

    @IsUUID()
    @IsOptional()
    id: string;

    @IsInt()
    @IsPositive()
    sessions: number;

    @IsUUID()
    @IsOptional()
    packet: string;

    @IsUUID()
    speciality: Speciality;

}