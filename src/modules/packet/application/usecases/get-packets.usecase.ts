import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { IResponse } from "src/common/interfaces/response.interface";
import { GetPacketsDto } from "../dto/get-packets.dto";
import { PacketsRepository } from "../../domain/repository/packets.repository";
import { Packet } from "../../domain/models/packet.model";

export class GetPacketsUseCase {

    constructor(
        private readonly packetsRepository: PacketsRepository
    ) { }

    async exec(data: GetPacketsDto): Promise<IResponse<Packet>> {
        try {
            const response = new ResponseHelper();

            const packets = await this.packetsRepository.get(data);
            response.result(packets);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}