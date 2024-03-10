import { Injectable } from "@nestjs/common";
import { PacketSpeciality } from "../../domain/models/packet-speciality.model";
import { PacketSpecialitiesRepository } from "../../domain/repository/packet-specialities.repository";

@Injectable()
export class PacketSpecialitiesRepositoryImpl implements PacketSpecialitiesRepository {

    show(id: any): Promise<PacketSpeciality> {
        throw new Error("Method not implemented.");
    }

    get(args: any): Promise<PacketSpeciality[]> {
        throw new Error("Method not implemented.");
    }

    list(args: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    create(data: PacketSpeciality): Promise<PacketSpeciality> {
        throw new Error("Method not implemented.");
    }

    update(id: any, data: PacketSpeciality): Promise<PacketSpeciality> {
        throw new Error("Method not implemented.");
    }

    delete(id: any): Promise<PacketSpeciality> {
        throw new Error("Method not implemented.");
    }

}