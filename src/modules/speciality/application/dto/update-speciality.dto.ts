import { PartialType } from "@nestjs/mapped-types";
import { CreateSpecialityDto } from "./create-speciality.dto";
import { IsUUID } from "class-validator";

export class UpdateSpecialityDto extends PartialType(CreateSpecialityDto) {

    @IsUUID()
    id: string;

}