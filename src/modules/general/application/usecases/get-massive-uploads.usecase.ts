import { IResponse } from "src/common/interfaces/response.interface";
import { MassiveUploadRepository } from "../../domain/repository/massive-upload.repository";
import { MassiveUpload } from "../../domain/models/massive-upload.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { GetMassiveUploadsDto } from "../dto/get-massive-uploads.dto";

export class GetMassiveUploadsUseCase {

    constructor(
        private readonly massiveUploadRepository: MassiveUploadRepository
    ) { }

    async exec(data: GetMassiveUploadsDto): Promise<IResponse<MassiveUpload[]>> {
        try {
            const response = new ResponseHelper();

            const massiveUploads = await this.massiveUploadRepository.get(data);

            response.result(massiveUploads);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw()
        }
    }

}