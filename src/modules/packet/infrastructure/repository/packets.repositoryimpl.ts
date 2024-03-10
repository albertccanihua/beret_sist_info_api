import { Injectable } from "@nestjs/common";
import { Packet } from "../../domain/models/packet.model";
import { PacketsRepository } from "../../domain/repository/packets.repository";

@Injectable()
export class PacketsRepositoryImpl implements PacketsRepository {

    show(id: any): Promise<Packet> {
        throw new Error("Method not implemented.");
    }

    get(args: any): Promise<Packet[]> {
        throw new Error("Method not implemented.");
    }

    list(args: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    create(data: Packet): Promise<Packet> {
        throw new Error("Method not implemented.");
    }

    update(id: any, data: Packet): Promise<Packet> {
        throw new Error("Method not implemented.");
    }

    delete(id: any): Promise<Packet> {
        throw new Error("Method not implemented.");
    }

}