import { IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { PaginateDto } from "src/common/dto/paginate.dto";

export class ListPacketsDto extends PaginateDto {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    id: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    user_creator: number;

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