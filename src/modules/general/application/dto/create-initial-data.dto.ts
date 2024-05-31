import { IsNumber, IsPositive } from "class-validator";

export class CreateInitialDataDto {

    @IsNumber()
    @IsPositive()
    user_creator: number;

}