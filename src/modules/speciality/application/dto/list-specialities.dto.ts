import { IsInt, IsOptional, IsString, IsUUID } from "class-validator";
import { PaginateDto } from "src/common/dto/paginate.dto";

export class ListSpecialitiesDto extends PaginateDto {

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