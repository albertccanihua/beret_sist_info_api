import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { IResponse } from "src/common/interfaces/response.interface";
import { IQueryBuilderPaginatedResponse } from "src/common/packages/request-broker/interfaces/query-builder-response-paginated.interface";
import { Packet } from "../../domain/models/packet.model";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { PacketsRepository } from "../../domain/repository/packets.repository";
import { ListPacketsDto } from "../dto/list-packets.dto";

export class ListPacketsUseCase {

    constructor(
        private readonly packetsRepository: PacketsRepository
    ) { }

    async exec(data: ListPacketsDto): Promise<IResponse<IQueryBuilderPaginatedResponse<Packet>>> {
        try {
            const response = new ResponseHelper();

            const packets = await this.packetsRepository.list(data);
            response.result(packets);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}