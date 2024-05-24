import { IsInt, IsOptional, IsString, IsUUID } from "class-validator";
import { PaginateDto } from "src/common/dto/paginate.dto";

export class ListPacketsDto extends PaginateDto {

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