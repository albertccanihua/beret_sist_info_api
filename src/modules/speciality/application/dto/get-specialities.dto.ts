import { IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class GetSpecialitiesDto {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    code: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsInt()
    @IsOptional()
    status: number;

}