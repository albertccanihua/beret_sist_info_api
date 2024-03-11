import { ShowPacketDto } from "src/modules/packet/application/dto/show-packet.dto";
import { PatientsRepository } from "../../domain/repository/patients.repository";
import { IResponse } from "src/common/interfaces/response.interface";
import { Patient } from "../../domain/models/patient.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { NotFoundException } from "@nestjs/common";

export class ShowPatientUseCase {

    constructor(
        private readonly patientsRepository: PatientsRepository
    ) { }

    async exec(data: ShowPacketDto): Promise<IResponse<Patient>> {
        try {
            const response = new ResponseHelper();

            const patient = await this.patientsRepository.show(data.id);

            if (!patient) throw new NotFoundException('Patient not found');
            response.result(patient);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}