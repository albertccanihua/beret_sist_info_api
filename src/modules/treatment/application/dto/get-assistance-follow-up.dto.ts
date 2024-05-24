import { IsDateString, IsUUID } from "class-validator";

export class GetAssistanceFollowUpDto {

    @IsUUID()
    profesional: string;

    @IsDateString()
    date_care: string;

}