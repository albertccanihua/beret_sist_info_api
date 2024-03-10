import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

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

    @IsBoolean()
    @IsOptional()
    status: boolean;

}