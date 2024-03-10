import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { IResponse } from "src/common/interfaces/response.interface";
import { PacketsRepository } from "../../domain/repository/packets.repository";
import { CreatePacketDto } from "../dto/create-packet.dto";
import { Packet } from "../../domain/models/packet.model";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { HttpStatus } from "@nestjs/common";
import { PacketSpeciality } from "../../domain/models/packet-speciality.model";
import { GeneralHelper } from "src/common/helpers/general.helper";
import { PacketSpecialitiesRepository } from "../../domain/repository/packet-specialities.repository";

export class CreatePacketUseCase {

    constructor(
        private readonly packetsRepository: PacketsRepository,
        private readonly packetSpecialitiesRepository: PacketSpecialitiesRepository
    ) { }

    async exec(data: CreatePacketDto): Promise<IResponse<Packet>> {
        try {
            const response = new ResponseHelper();

            const packet = await this.packetsRepository.create({
                user_id: data.user_id,
                name: data.name,
                description: data.description,
                status: data.status
            });

            data.specialities.forEach(async (speciality: PacketSpeciality) => {
                if (GeneralHelper.existsAndNotEmpty(speciality, 'id')) {
                    await this.packetSpecialitiesRepository.update(speciality.id, speciality);
                } else {
                    await this.packetSpecialitiesRepository.create(speciality);
                }
            });

            response.code(HttpStatus.CREATED).result(packet);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}