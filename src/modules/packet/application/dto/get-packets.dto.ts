import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class GetPacketsDto {

    @IsUUID()
    @IsOptional()
    id: string;

    @IsUUID()
    @IsOptional()
    user_id: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;
    
}