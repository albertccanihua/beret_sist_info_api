import { IsBoolean, IsInt, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";

export class GetManagementTypesDto {

    @IsUUID()
    @IsOptional()
    id: string;

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