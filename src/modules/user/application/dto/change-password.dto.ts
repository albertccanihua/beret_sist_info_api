import { IsNumber, IsPositive, IsString } from "class-validator";

export class ChangePasswordDto {

    @IsNumber()
    @IsPositive()
    id: number;

    @IsString()
    password: string;

}