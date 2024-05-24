import {IResponse} from "src/common/interfaces/response.interface";
import {PatientsRepository} from "../../domain/repository/patients.repository";
import {CreatePatientDto} from "../dto/create-patient.dto";
import {Patient} from "../../domain/models/patient.model";
import {HandleExceptionHelper} from "src/common/helpers/handle-exception.helper";
import {ResponseHelper} from "src/common/helpers/response.helper";
import {HttpStatus} from "@nestjs/common";

export class CreatePatientUseCase {

    constructor(
        private readonly patientsRepository: PatientsRepository
    ) {
    }

    async exec(data: CreatePatientDto): Promise<IResponse<Patient>> {
        try {
            const response = new ResponseHelper();

            const patient = await this.patientsRepository.create({
                user_creator: data.user_creator,
                document_number: data.document_number,
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

            response.code(HttpStatus.CREATED).result(patient);

            return response.resolve();
        } catch (error) {
            console.log(error);
            throw new HandleExceptionHelper(error).throw();
        }
    }

}