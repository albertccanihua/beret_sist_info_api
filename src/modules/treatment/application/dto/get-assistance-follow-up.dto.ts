import { IsDateString, IsNumber, IsPositive } from "class-validator";

export class GetAssistanceFollowUpDto {

    @IsNumber()
    @IsPositive()
    profesional: number;

    @IsDateString()
    date_care: string;

}