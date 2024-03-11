import { PartialType } from "@nestjs/mapped-types";
import { IsUUID } from "class-validator";
import { CreateManagementTypeDto } from "./create-management-type.dto";

export class UpdateManagementTypeDto extends PartialType(CreateManagementTypeDto) {

    @IsUUID()
    id: string;

}