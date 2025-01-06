import { PatientsRepository } from "src/modules/patient/domain/repository/patients.repository";
import { UploadDataDto } from "../dto/upload-data.dto";
import { ManagementTypesRepository } from "../../domain/repository/management-type.repository";
import { PacketsRepository } from "src/modules/packet/domain/repository/packets.repository";
import { IPacketRelated } from "../interfaces/packet-related.interface";
import { TreatmentsRepository } from "src/modules/treatment/domain/repository/treatments.repository";
import { TreatmentSpecialitiesRepostory } from "src/modules/treatment/domain/repository/treatment-specialities.repository";
import { TreatmentAssistancesRepository } from "src/modules/treatment/domain/repository/treatment-assistances.repository";
import { IUploadedItem } from "../interfaces/uploaded-item.interface";
import { ManagementType } from "../../domain/models/management-type.model";
import { Packet } from "src/modules/packet/domain/models/packet.model";
import { Treatment } from "src/modules/treatment/domain/models/treatment.model";
import { TreatmentSpeciality } from "src/modules/treatment/domain/models/treatment-speciality.model";
import { User } from "src/modules/user/domain/models/user.model";
import { UsersRepository } from "src/modules/user/domain/repository/users.repository";
import { SpecialitiesRepository } from "src/modules/speciality/domain/repository/specialities.repository";
import { Speciality } from "src/modules/speciality/domain/models/speciality.model";
import { Patient } from "src/modules/patient/domain/models/patient.model";
import { PacketSpecialitiesRepository } from "src/modules/packet/domain/repository/packet-specialities.repository";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { MassiveUploadRepository } from "../../domain/repository/massive-upload.repository";
import { MassiveUploadItemRepository } from "../../domain/repository/massive-upload-item.repository";
import { MassiveUpload } from "../../domain/models/massive-upload.model";

export class MassiveUploadUseCase {

    // General data
    private typeDocuments: ManagementType[] = [];
    private typeGenders: ManagementType[] = [];
    private typeFinancing: ManagementType[] = [];
    private typeStatusTreatments: ManagementType[] = [];

    // Packets
    private packets: Packet[] = [];
    private packetRelatedCodes: IPacketRelated[] = [];

    // Uploaded data
    private uploadedData: IUploadedItem[] = [];

    constructor(
        private patientsRepository: PatientsRepository,
        private usersRepository: UsersRepository,
        private managementTypesRepository: ManagementTypesRepository,
        private packetsRepository: PacketsRepository,
        private packetSpecialitiesRepository: PacketSpecialitiesRepository,
        private specialitiesRepository: SpecialitiesRepository,
        private treatmentsRepository: TreatmentsRepository,
        private treatmentSpecialitiesRepository: TreatmentSpecialitiesRepostory,
        private treatmentAssistancesRepository: TreatmentAssistancesRepository,
        private massiveUploadRepository: MassiveUploadRepository,
        private massiveUploadItemRepository: MassiveUploadItemRepository
    ) { }

    async exec(data: UploadDataDto) {
        try {
            const response = new ResponseHelper();

            await this.getGeneralData();
            await this.getAllPackets();

            this.groupPacketsWithRelationalCodes();

            // Register patients
            await this.uploadPatients(data);

            // Registrar tratamientos
            await this.uploadAssistances(data);

            const massiveUpload = await this.massiveUploadRepository.create({
                filename: data.filename,
                user_creator: data.user_creator,
                status: true
            });

            if (massiveUpload) {
                for (let data of this.uploadedData) {
                    await this.massiveUploadItemRepository.create({
                        item: data.item,
                        reason: data.reason,
                        status: data.status,
                        massive_upload: massiveUpload
                    });
                }
            }


            response.code(201);
            response.result(this.uploadedData);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

    // =================================
    // Processes
    // =================================

    private async uploadPatients(data: UploadDataDto) {
        try {
            for (const item of data.items) {
                const typeDocument = this.typeDocuments.filter((type_document) => type_document.name === item.abrev_tipo_doc_paciente);
                const typeGender = this.typeGenders.filter((type_gender) => type_gender.name === this.formatGender(item.genero));
                const typeFinancing = this.typeFinancing.filter((type_financing) => type_financing.name === item.descripcion_financiador);

                if (typeDocument.length > 0 && typeGender.length > 0 && typeFinancing.length > 0) {

                    const registeredPatient = await this.patientsRepository.showByParams({ document_number: item.numero_documento_paciente });

                    if (registeredPatient != null) continue;

                    await this.patientsRepository.create({
                        user_creator: data.user_creator,
                        document_number: item.numero_documento_paciente,
                        medical_history: item.historia_clinica,
                        dob: item.fecha_nacimiento_paciente,
                        name: item.nombres_paciente,
                        paternal_surname: item.apellido_paterno_paciente,
                        maternal_lastname: item.apellido_materno_paciente,
                        type_document: typeDocument[0].id,
                        type_gender: typeGender[0].id,
                        type_financing: typeFinancing[0].id
                    });
                }

            }
        } catch (error) {
            console.log('ERROR AL REGISTRO DE PACIENTE', error);
        }
    }

    private async uploadAssistances(data: UploadDataDto) {
        let currentPacketId: number = null;

        for (let item of data.items) {

            let errors: string[] = [];

            // Validate initial data
            // =================================

            if (!this.isValidData(item.fecha_atencion)) errors.push('La fecha de atención no es válida');

            if (!this.isValidData(item.abrev_tipo_doc_paciente)) errors.push('El tipo de documento del paciente no es válido');
            if (!this.isValidData(item.numero_documento_paciente)) errors.push('El número de documento del paciente no es válido');
            if (!this.isValidData(item.apellido_paterno_paciente)) errors.push('El apellido paterno del paciente no es válido');
            if (!this.isValidData(item.nombres_paciente)) errors.push('El nombre del paciente no es válido');
            if (!this.isValidGender(item.genero)) errors.push('El género del paciente no es válido [F,M]');

            if (!this.isValidData(item.numero_documento_personal)) errors.push('El número de documento del personal no es válido');

            if (!this.isValidData(item.codigo_item)) errors.push('El código de (paquete | especialidad) no es válido');

            // If there are errors add the item to an error array with the reasons
            // =================================

            if (errors.length > 0) {
                this.addErrorItem(item, errors);
                continue;
            }

            // Find patient by document number
            const foundPatient = await this.getPatientByDocumentNumber(item.numero_documento_paciente);

            if (foundPatient === null) {
                this.addErrorItem(item, ['No existe un paciente relacionada a este número de documento (' + item.numero_documento_paciente + ')']);
                continue;
            }

            // Find packet by the relational code
            // =================================

            let foundPacket: any = null;

            if (currentPacketId === null) {
                foundPacket = this.getPacketByPacketCode(item.codigo_item);
                if (foundPacket !== null) currentPacketId = foundPacket.id;
            } else if (currentPacketId !== null) {

                // If we find a package set as current packet and go to the next item
                // =================================

                foundPacket = this.getPacketByPacketCode(item.codigo_item);
                if (foundPacket !== null && foundPacket.id !== currentPacketId) {
                    currentPacketId = foundPacket.id;
                    continue;
                }
            }

            // If the current package is null add the item to an error array with the reason
            // =================================

            if (currentPacketId === null) {
                this.addErrorItem(item, ['El código de especialidad no se está relacionando a ningun paquete o tratamiento']);
                continue;
            }

            let activeTreatment = await this.getActiveTreatmentByPacketId(item.numero_documento_paciente);

            // If there aren´t a active treatment create one
            // =================================

            if (activeTreatment === null) {

                const nextTreatment = await this.treatmentsRepository.getPatientTreatmentCorrelative(
                    foundPatient.id,
                    item.numero_documento_paciente
                );

                try {
                    const treatmentCreated = await this.treatmentsRepository.create({
                        user_creator: data.user_creator,
                        code: nextTreatment.correlative,
                        name: 'Tratamiento ' + nextTreatment.number,
                        acceptance_rate: 0,
                        status: true,
                        packet: new Packet(currentPacketId),
                        patient: new Patient(foundPatient.id),
                        type_status_treatment: this.getTreatmentInProcessStatus()
                    });

                    const packetSpecialities = await this.packetSpecialitiesRepository.get({ packet: currentPacketId });

                    for (let packetSpeciality of packetSpecialities) {
                        await this.treatmentSpecialitiesRepository.create({
                            sessions: packetSpeciality.sessions,
                            sessions_taken: 0,
                            treatment: treatmentCreated,
                            speciality: packetSpeciality.speciality
                        });
                    }

                    activeTreatment = await this.getActiveTreatmentByPacketId(item.numero_documento_paciente);
                } catch (error) {
                    continue;
                }
            }

            /**
             * If the packet id of the active treatment is different to the currentPacketId
             * add the item to an error array with the reason
             */
            // =================================

            if (activeTreatment?.packet?.id != currentPacketId) {
                this.addErrorItem(item, ['La especialidad no está relacionada a un tratamiento activo']);
                continue;
            }

            // Find speciality by code
            // =================================

            const foundSpeciality = await this.getSpecialityByCode(item.codigo_item);

            if (foundSpeciality === null) {
                this.addErrorItem(item, ['No existe una especialidad relacionada a este código (' + item.codigo_item + ')']);
                continue;
            }

            // Find speciality by document number
            // =================================

            const foundProfessional = await this.getProfessionalByDocumentNumber(item.numero_documento_personal);

            if (foundProfessional === null) {
                this.addErrorItem(item, ['No existe un presional relacionado a este número de documento (' + item.numero_documento_personal + ')']);
                continue;
            }

            // Find treatment speciality
            // =================================

            const foundTreatmentSpeciality = await this.getTreatmentSpeciality(activeTreatment.id, foundSpeciality.id);

            if (foundTreatmentSpeciality === null) {
                this.addErrorItem(item, ['La especialidad no está relacionada a un tratamiento activo']);
                continue;
            }

            // Register assistance of treatment
            // =================================

            try {
                await this.treatmentAssistancesRepository.create({
                    date_appointment: item.fecha_atencion,
                    date_care: item.fecha_atencion,
                    status: true,
                    treatment: new Treatment(activeTreatment.id),
                    treatment_speciality: new TreatmentSpeciality(foundTreatmentSpeciality.id),
                    profesional: new User(foundProfessional.id),
                })
            } catch (error) {
                this.addErrorItem(item, error);
                continue;
            }

            // Update sessions taken
            // =================================

            try {
                await this.treatmentSpecialitiesRepository.update(foundTreatmentSpeciality.id, {
                    sessions: foundTreatmentSpeciality.sessions,
                    sessions_taken: foundTreatmentSpeciality.sessions_taken + 1,
                    treatment: foundTreatmentSpeciality.treatment,
                    speciality: foundTreatmentSpeciality.speciality
                });
            } catch (error) {
                this.addErrorItem(item, error);
                continue;
            }

            this.addSuccessItem(item);
        }
    }

    // =================================
    // Helpers
    // =================================

    private async getGeneralData() {
        this.typeDocuments = await this.managementTypesRepository.get({ type: 'type_document', status: 1 });
        this.typeGenders = await this.managementTypesRepository.get({ type: 'type_gender', status: 1 });
        this.typeFinancing = await this.managementTypesRepository.get({ type: 'type_financing', status: 1 });
        this.typeStatusTreatments = await this.managementTypesRepository.get({ type: 'type_status_treatment', status: 1 });
    }

    private async getAllPackets() {
        this.packets = await this.packetsRepository.get({ status: 1 });
    }

    private async getActiveTreatmentByPacketId(patient_document_number: string): Promise<Treatment> {
        const treatmentResponse = await this.treatmentsRepository.get({
            status: 1,
            type_status_treatment: this.getTreatmentInProcessStatus().id,
            patient_document_number
        });

        if (treatmentResponse.length === 0) return null;
        return treatmentResponse[0];
    }

    private async getProfessionalByDocumentNumber(document_number: string): Promise<User> {
        const professionalResponse = await this.usersRepository.get({ document_number, status: true });
        if (professionalResponse.length === 0) return null;
        return professionalResponse[0];
    }

    private async getPatientByDocumentNumber(document_number: string): Promise<Patient> {
        const patientResponse = await this.patientsRepository.get({ document_number, status: true });
        if (patientResponse.length === 0) return null;
        return patientResponse[0];
    }

    private async getSpecialityByCode(code: string): Promise<Speciality> {
        const specialityResponse = await this.specialitiesRepository.get({ code, status: true });
        if (specialityResponse.length === 0) return null;
        return specialityResponse[0];
    }

    private async getTreatmentSpeciality(treatment_id: number, speciality_id: number) {
        const treatmentSpecialityResponse = await this.treatmentSpecialitiesRepository.get({
            treatment: treatment_id,
            speciality: speciality_id
        });
        if (treatmentSpecialityResponse.length === 0) return null;
        return treatmentSpecialityResponse[0];
    }

    private groupPacketsWithRelationalCodes() {
        this.packets.forEach((packet) => {
            const arrCodes = packet.relational_codes != null ? packet.relational_codes.split(',') : [];

            arrCodes.forEach((code) => {
                this.packetRelatedCodes.push({ code: code, packet_id: packet.id })
            });
        })
    }

    private isValidData(value: any): boolean {
        if (
            value === null ||
            value === 'null' ||
            value === '' ||
            value === undefined ||
            value === 'undefined'
        ) return false;
        return true;
    }

    private isValidGender(value: any): boolean {
        if (value === 'F' || value === 'M') return true;
        return false;
    }

    private formatGender(value: string) {
        return value === 'F' ? 'Mujer' : 'Hombre';
    }

    private getPacketByPacketCode = (packetCode: string): any => {
        const packetId = this.packetRelatedCodes.filter((packet) => packet.code === packetCode);
        if (packetId.length === 0) return null;
        return this.packets.filter((packet) => packet.id === packetId[0].packet_id)[0]
    };

    private getTreatmentInProcessStatus() {
        return this.typeStatusTreatments.filter((status) => status.name === 'En proceso')[0];
    }

    private addErrorItem(item: any, reason: any) {
        this.uploadedData.push({
            item: JSON.stringify(item),
            status: false,
            reason: JSON.stringify(reason)
        });
    }

    private addSuccessItem(item: any) {
        this.uploadedData.push({
            item: JSON.stringify(item),
            status: true,
            reason: JSON.stringify(['Cargado correctamente'])
        });
    }
}
