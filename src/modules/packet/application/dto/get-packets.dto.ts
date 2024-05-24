import { IsIn, IsInt, IsOptional, IsString, IsUUID } from "class-validator";

export class GetPacketsDto {

    @IsUUID()
    @IsOptional()
    id: string;

    @IsUUID()
    @IsOptional()
    user_creator: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsInt()
    @IsOptional()
    status: number;

}