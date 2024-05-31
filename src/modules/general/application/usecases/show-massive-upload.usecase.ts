import { IResponse } from "src/common/interfaces/response.interface";
import { MassiveUploadRepository } from "../../domain/repository/massive-upload.repository";
import { ShowMassiveUploadDto } from "../dto/show-massive-upload.dto";
import { MassiveUpload } from "../../domain/models/massive-upload.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { NotFoundException } from "@nestjs/common";

export class ShowMassiveUploadUseCase {

    constructor(
        private readonly massiveUploadRepository: MassiveUploadRepository
    ) { }

    async exec(data: ShowMassiveUploadDto): Promise<IResponse<MassiveUpload>> {
        try {
            const response = new ResponseHelper();

            const massiveUpload = await this.massiveUploadRepository.show(data.id)

            if (!massiveUpload) throw new NotFoundException('Massive upload not found');
            response.result(massiveUpload);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw()
        }
    }
}