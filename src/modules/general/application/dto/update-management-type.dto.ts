import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsPositive } from "class-validator";
import { CreateManagementTypeDto } from "./create-management-type.dto";

export class UpdateManagementTypeDto extends PartialType(CreateManagementTypeDto) {

    @IsNumber()
    @IsPositive()
    id: number;

}