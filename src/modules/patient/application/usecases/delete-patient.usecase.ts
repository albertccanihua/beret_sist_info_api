import { IResponse } from "src/common/interfaces/response.interface";
import { PatientsRepository } from "../../domain/repository/patients.repository";
import { DeletePatientDto } from "../dto/delete-patient.dto";
import { Patient } from "../../domain/models/patient.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { NotFoundException } from "@nestjs/common";

export class DeletePatientUseCase {

    constructor(
        private readonly patientsRepository: PatientsRepository
    ) { }

    async exec(data: DeletePatientDto): Promise<IResponse<Patient>> {
        try {
            const response = new ResponseHelper();

            const patient = await this.patientsRepository.delete(data.id);

            if (!patient) throw new NotFoundException('Patient not found');
            response.result(patient);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

}