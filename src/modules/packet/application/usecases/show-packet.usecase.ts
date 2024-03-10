import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { IResponse } from "src/common/interfaces/response.interface";
import { PacketsRepository } from "../../domain/repository/packets.repository";
import { ShowPacketDto } from "../dto/show-packet.dto";
import { Packet } from "../../domain/models/packet.model";
import { ResponseHelper } from "src/common/helpers/response.helper";

export class ShowPacketUseCase {

    constructor(
        private readonly packetsRepository: PacketsRepository
    ) { }

    async exec(data: ShowPacketDto): Promise<IResponse<Packet>> {
        try {
            const response = new ResponseHelper();

            const packet = await this.packetsRepository.show(data.id);
            response.result(packet);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}