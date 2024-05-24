import { IsInt, IsOptional, IsString, IsUUID } from "class-validator";

export class GetSpecialitiesDto {

    @IsUUID()
    @IsOptional()
    id: string;

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