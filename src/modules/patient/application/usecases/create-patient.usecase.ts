import { IResponse } from "src/common/interfaces/response.interface";
import { PatientsRepository } from "../../domain/repository/patients.repository";
import { CreatePatientDto } from "../dto/create-patient.dto";
import { Patient } from "../../domain/models/patient.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { HttpStatus } from "@nestjs/common";

export class CreatePatientUseCase {

    constructor(
        private readonly patientsRepository: PatientsRepository
    ) { }

    async exec(data: CreatePatientDto): Promise<IResponse<Patient>> {
        try {
            const response = new ResponseHelper();

            const patient = await this.patientsRepository.create({
                user_id: data.user_id,
                document_number: data.document_number,
                dob: data.dob,
                name: data.name,
                paternal_surname: data.paternal_surname,
                maternal_lastname: data.maternal_lastname,
                email: data.email,
                phone_number: data.email,
                status: data.status,
                type_document_id: data.type_document_id,
                type_gender_id: data.type_gender_id,
                type_financing_id: data.type_financing_id
            });

            response.code(HttpStatus.CREATED).result(patient);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

}