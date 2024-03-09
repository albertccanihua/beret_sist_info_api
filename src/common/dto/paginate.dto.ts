import { IsInt, IsNumber, IsPositive } from "class-validator";

export class PaginateDto {

    @IsInt()
    @IsPositive()
    limit: number;

    @IsInt()
    @IsPositive()
    page: number

}