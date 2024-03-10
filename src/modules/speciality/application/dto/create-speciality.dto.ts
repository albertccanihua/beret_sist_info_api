import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateSpecialityDto {

    @IsUUID()
    user_id: string;

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