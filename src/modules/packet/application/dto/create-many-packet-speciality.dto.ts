import { IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";
import { Speciality } from "src/modules/speciality/domain/models/speciality.model";

export class CreateManyPacketSpecialityDto {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    id: number;

    @IsInt()
    @IsPositive()
    sessions: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    packet: number;

    @IsNumber()
    @IsPositive()
    speciality: Speciality;

}