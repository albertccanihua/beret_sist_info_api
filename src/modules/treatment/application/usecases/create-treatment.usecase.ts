import { TreatmentSpecialitiesRepostory } from "../../domain/repository/treatment-specialities.repository";
import { TreatmentsRepository } from "../../domain/repository/treatments.repository";
import { CreateTreatmentDto } from "../dto/create-treatment.dto";
import { IResponse } from "src/common/interfaces/response.interface";
import { Treatment } from "../../domain/models/treatment.model";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { ManagementTypesRepository } from "src/modules/general/domain/repository/management-type.repository";
import { PacketSpecialitiesRepositoryImpl } from "src/modules/packet/infrastructure/repository/packet-specialities.repositoryimpl";
import { PacketSpeciality } from "src/modules/packet/domain/models/packet-speciality.model";
import { HttpStatus } from "@nestjs/common";

export class CreateTreatmentUseCase {

    constructor(
        private readonly treatmentsRepository: TreatmentsRepository,
        private readonly treatmentSpecialitiesRepository: TreatmentSpecialitiesRepostory,
        private readonly packetSpecialitiesRepository: PacketSpecialitiesRepositoryImpl,
        private readonly managementTypesRepository: ManagementTypesRepository
    ) { }

    async exec(data: CreateTreatmentDto): Promise<IResponse<Treatment>> {
        try {
            const response = new ResponseHelper();

            const nextTreatment = await this.treatmentsRepository.getPatientTreatmentCorrelative(data.patient.id, data.patient_document_number);
            const statusTreatment = await this.managementTypesRepository.show({ name: 'En proceso' });
            const packetSpecialities: PacketSpeciality[] = await this.packetSpecialitiesRepository.get({ packet: data.packet });

            const treatment = await this.treatmentsRepository.create({
                user_creator: data.user_creator,
                code: nextTreatment.correlative,
                name: 'Tratamiento ' + nextTreatment.number,
                acceptance_rate: 0,
                status: true,
                packet: data.packet,
                patient: data.patient,
                type_status_treatment: statusTreatment,
            });

            packetSpecialities.forEach(async (item) => {
                await this.treatmentSpecialitiesRepository.create({
                    sessions: item.sessions,
                    sessions_taken: 0,
                    treatment: treatment,
                    speciality: item.speciality
                });
            });

            response.code(HttpStatus.CREATED).result(treatment);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

}