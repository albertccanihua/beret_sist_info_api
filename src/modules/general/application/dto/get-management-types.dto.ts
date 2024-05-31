import { IsBoolean, IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class GetManagementTypesDto {

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

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    data: string;

    @IsString()
    @IsOptional()
    type: string;

    @IsInt()
    @IsOptional()
    status: number;

}