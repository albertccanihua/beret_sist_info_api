import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateManagementTypeDto {

    @IsString()
    @IsOptional()
    code: string;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    data: string;

    @IsString()
    type: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

}