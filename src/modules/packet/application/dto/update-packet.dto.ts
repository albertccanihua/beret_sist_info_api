import { PartialType } from "@nestjs/mapped-types";
import { CreatePacketDto } from "./create-packet.dto";
import { IsNumber, IsPositive } from "class-validator";

export class UpdatePacketDto extends PartialType(CreatePacketDto) {

    @IsNumber()
    @IsPositive()
    id: number;

}