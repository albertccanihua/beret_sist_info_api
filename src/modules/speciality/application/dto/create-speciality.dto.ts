import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateSpecialityDto {

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

    @IsBoolean()
    @IsOptional()
    status: boolean;
}