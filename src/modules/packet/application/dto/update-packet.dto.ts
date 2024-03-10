import { PartialType } from "@nestjs/mapped-types";
import { CreatePacketDto } from "./create-packet.dto";
import { IsUUID } from "class-validator";

export class UpdatePacketDto extends PartialType(CreatePacketDto) {

    @IsUUID()
    id: string;

}