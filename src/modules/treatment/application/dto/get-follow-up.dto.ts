import { IsDateString, IsNumber, IsOptional, IsPositive } from "class-validator";

export class GetFollowUpDto {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    user_creator: number;

    @IsDateString()
    created_at: string;

}