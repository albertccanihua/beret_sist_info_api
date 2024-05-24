import { IsUUID } from "class-validator";

export class CreateInitialDataDto {

    @IsUUID()
    user_creator: string;

}