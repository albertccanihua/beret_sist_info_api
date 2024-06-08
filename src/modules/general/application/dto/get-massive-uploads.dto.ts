import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetMassiveUploadsDto {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    filename: string;

}