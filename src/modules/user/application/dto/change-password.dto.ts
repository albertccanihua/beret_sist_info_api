import { IsString, IsUUID } from "class-validator";

export class ChangePasswordDto {

    @IsUUID()
    id: string;

    @IsString()
    password: string;

}