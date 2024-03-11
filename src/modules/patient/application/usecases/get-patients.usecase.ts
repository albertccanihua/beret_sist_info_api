import { IResponse } from "src/common/interfaces/response.interface";
import { PatientsRepository } from "../../domain/repository/patients.repository";
import { GetPatientsDto } from "../dto/get-patients.dto";
import { Patient } from "../../domain/models/patient.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";

export class GetPatientsUseCase {

    constructor(
        private readonly patientsRepository: PatientsRepository
    ) { }

    async exec(data: GetPatientsDto): Promise<IResponse<Patient[]>> {
        try {
            const response = new ResponseHelper();

            const patients = await this.patientsRepository.get(data);
            response.result(patients);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

}