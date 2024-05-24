import { IsDateString, IsOptional, IsUUID } from "class-validator";

export class GetFollowUpDto {

    @IsUUID()
    @IsOptional()
    user_creator: string;

    @IsDateString()
    created_at: string;

}