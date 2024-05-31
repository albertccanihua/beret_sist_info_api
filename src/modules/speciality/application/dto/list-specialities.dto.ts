import { IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { PaginateDto } from "src/common/dto/paginate.dto";

export class ListSpecialitiesDto extends PaginateDto {

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