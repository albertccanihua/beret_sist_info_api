import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { PaginateDto } from "src/common/dto/paginate.dto";

export class ListManagementTypesDto extends PaginateDto {

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

    @IsBoolean()
    @IsOptional()
    status: string;

}