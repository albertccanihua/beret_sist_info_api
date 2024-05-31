import { Speciality } from "src/modules/speciality/domain/models/speciality.model";
import { Packet } from "./packet.model";

export class PacketSpeciality {
    id?: number;
    sessions: number;
    packet: Packet;
    speciality: Speciality;
}