import { CreateInitialDataDto } from "../dto/create-initial-data.dto";
import { readFileSync } from 'fs';
import { IPacketInitialData } from "../interfaces/packet-initial-data.interface";
import { PacketsRepository } from "src/modules/packet/domain/repository/packets.repository";
import { ISpecialityInitialData } from "../interfaces/speciality-initial-data.interface";
import { SpecialitiesRepository } from "src/modules/speciality/domain/repository/specialities.repository";
import { IPacketSpecialitiesInitialData } from "../interfaces/packet-specialities-initial-data.interface";
import { PacketSpecialitiesRepository } from "src/modules/packet/domain/repository/packet-specialities.repository";
import { Packet } from "src/modules/packet/domain/models/packet.model";
import { Speciality } from "src/modules/speciality/domain/models/speciality.model";
import { IManagementTypesInitialData } from "../interfaces/management-types-initial-data.interface";
import { ManagementTypesRepository } from "../../domain/repository/management-type.repository";
import { ConfigService } from "@nestjs/config";
import { UsersRepository } from "src/modules/user/domain/repository/users.repository";
import * as bcrypt from 'bcrypt';

export class CreateInitialDataUseCase {

    managementTypesToCreate: IManagementTypesInitialData[] = [];
    packetsToCreate: IPacketInitialData[] = [];
    specialitiesToCreate: ISpecialityInitialData[] = [];
    packetSpecialitiesToCreate: IPacketSpecialitiesInitialData[] = [];

    initialUserId: number = null;

    constructor(
        private readonly managementTypesRepository: ManagementTypesRepository,
        private readonly usersRepository: UsersRepository,
        private readonly packetsRepository: PacketsRepository,
        private readonly specialitiesRepository: SpecialitiesRepository,
        private readonly packetSpecialitiesRepository: PacketSpecialitiesRepository,
        private readonly configService: ConfigService
    ) { }

    async exec(data: CreateInitialDataDto) {
        await this.createManagementTypes();
        await this.createInitialUser();
        await this.createPackets();
        await this.createSpecialities();
        await this.createPacketSpecialities();

        return {
            packets: this.packetsToCreate,
            specialities: this.specialitiesToCreate
        };
    }

    private async createManagementTypes() {
        const data = readFileSync(__dirname + '../../../../../../src/data/management-types.data.json', 'utf8');
        this.managementTypesToCreate = JSON.parse(data);

        for (let managementType of this.managementTypesToCreate) {
            const managementTypeAlreadyExists = await this.managementTypesRepository.get({ name: managementType.name });
            if (managementTypeAlreadyExists.length > 0) continue;

            await this.managementTypesRepository.create({
                name: managementType.name,
                type: managementType.type,
                status: true
            })
        }
    }

    private async createInitialUser() {

        const userAlreadyExists = await this.usersRepository.get({ username: this.configService.get('SUPER_ADMIN_USERNAME') })

        if (userAlreadyExists.length > 0) {
            this.initialUserId = userAlreadyExists[0].id;
        } else {
            const typeDocument = await this.managementTypesRepository.get({ name: 'DNI' });
            const typeGender = await this.managementTypesRepository.get({ name: 'Hombre' });
            const typeRole = await this.managementTypesRepository.get({ name: 'Administrador' });

            const userCreated = await this.usersRepository.create({
                document_number: this.configService.get('SUPER_ADMIN_DOCUMENT_NUMBER'),
                dob: this.configService.get('SUPER_ADMIN_DOB'),
                name: this.configService.get('SUPER_ADMIN_NAME'),
                paternal_surname: this.configService.get('SUPER_ADMIN_PATERNAL_SURNAME'),
                maternal_lastname: this.configService.get('SUPER_ADMIN_MATERNAL_LASTNAME'),
                username: this.configService.get('SUPER_ADMIN_USERNAME'),
                password: bcrypt.hashSync(this.configService.get('SUPER_ADMIN_PASSWORD'), 10),
                type_document: typeDocument[0].id,
                type_gender: typeGender[0].id,
                type_role: typeRole[0].id
            })

            this.initialUserId = userCreated.id;
        }

    }

    private async createPackets() {
        const data = readFileSync(__dirname + '../../../../../../src/data/packets.data.json', 'utf8');
        this.packetsToCreate = JSON.parse(data);

        for (let packet of this.packetsToCreate) {
            const packetAlreadyExists = await this.packetsRepository.get({ code: packet.code });
            if (packetAlreadyExists.length > 0) continue;

            await this.packetsRepository.create({
                user_creator: this.initialUserId,
                name: packet.name,
                description: '',
                relational_codes: packet.relational_codes,
                code: packet.code,
                status: true
            })
        }
    }

    private async createSpecialities() {
        const data = readFileSync(__dirname + '../../../../../../src/data/specialities.data.json', 'utf8');
        this.specialitiesToCreate = JSON.parse(data);

        for (let speciality of this.specialitiesToCreate) {
            const specialityAlreadyExists = await this.specialitiesRepository.get({ code: speciality.code });
            if (specialityAlreadyExists.length > 0) continue;

            await this.specialitiesRepository.create({
                user_creator: this.initialUserId,
                code: speciality.code,
                name: speciality.name,
                status: true
            })
        }
    }

    private async createPacketSpecialities() {
        const data = readFileSync(__dirname + '../../../../../../src/data/packet-specialities.data.json', 'utf8');
        this.packetSpecialitiesToCreate = JSON.parse(data);

        for (let packetSpeciality of this.packetSpecialitiesToCreate) {

            const foundPackets = await this.packetsRepository.get({ code: packetSpeciality.packet_code });
            if (foundPackets.length == 0) continue;

            for (let speciality of packetSpeciality.specialities) {

                const foundSpecialities = await this.specialitiesRepository.get({ code: speciality.code });
                if (foundSpecialities.length == 0) continue;

                const packetSpecialityAlreadyExists = await this.packetSpecialitiesRepository.get({
                    packet: foundPackets[0].id,
                    speciality: foundSpecialities[0].id
                })
                if (packetSpecialityAlreadyExists.length > 0) continue;

                await this.packetSpecialitiesRepository.create({
                    sessions: speciality.sessions,
                    packet: new Packet(foundPackets[0].id),
                    speciality: new Speciality(foundSpecialities[0].id)
                });
            }
        }
    }
}