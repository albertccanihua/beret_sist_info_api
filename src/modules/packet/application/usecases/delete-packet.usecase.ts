import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { IResponse } from "src/common/interfaces/response.interface";
import { PacketsRepository } from "../../domain/repository/packets.repository";
import { DeletePacketDto } from "../dto/delete-packet.dto";
import { Packet } from "../../domain/models/packet.model";
import { NotFoundException } from "@nestjs/common";

export class DeletePacketUseCase {

    constructor(
        private readonly packetsRepository: PacketsRepository
    ) { }

    async exec(data: DeletePacketDto): Promise<IResponse<Packet>> {
        try {
            const response = new ResponseHelper();

            const packet = await this.packetsRepository.delete(data.id);

            if (!packet) throw new NotFoundException('Packet not found');
            response.result(packet);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}