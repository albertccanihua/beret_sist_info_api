import { PartialType } from "@nestjs/mapped-types";
import { CreateSpecialityDto } from "./create-speciality.dto";
import { IsNumber, IsPositive } from "class-validator";

export class UpdateSpecialityDto extends PartialType(CreateSpecialityDto) {

    @IsNumber()
    @IsPositive()
    id: number;

}