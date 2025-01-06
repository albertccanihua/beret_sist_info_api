import { IResponse } from "src/common/interfaces/response.interface";
import { PatientsRepository } from "../../domain/repository/patients.repository";
import { UpdatePatientDto } from "../dto/update-patient.dto";
import { Patient } from "../../domain/models/patient.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { NotFoundException } from "@nestjs/common";

export class UpdatePatientUseCase {

    constructor(
        private readonly patientsRepository: PatientsRepository
    ) { }

    async exec(data: UpdatePatientDto): Promise<IResponse<Patient>> {
        try {
            const response = new ResponseHelper();

            const patient = await this.patientsRepository.update(data.id, {
                user_creator: data.user_creator,
                document_number: data.document_number,
                medical_history: data.medical_history,
                dob: data.dob,
                name: data.name,
                paternal_surname: data.paternal_surname,
                maternal_lastname: data.maternal_lastname,
                email: data.email,
                phone_number: data.phone_number,
                status: data.status,
                type_document: data.type_document,
                type_gender: data.type_gender,
                type_financing: data.type_financing
            });

            if (!patient) throw new NotFoundException('Patient not found');
            response.result(patient);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

}