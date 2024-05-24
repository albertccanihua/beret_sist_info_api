import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { IResponse } from "src/common/interfaces/response.interface";
import { PacketsRepository } from "../../domain/repository/packets.repository";
import { PacketSpecialitiesRepository } from "../../domain/repository/packet-specialities.repository";
import { UpdatePacketDto } from "../dto/update-packet.dto";
import { Packet } from "../../domain/models/packet.model";
import { ResponseHelper } from "src/common/helpers/response.helper";

export class UpdatePacketUseCase {

    constructor(
        private readonly packetsRepository: PacketsRepository,
        private readonly packetSpecialitiesRepository: PacketSpecialitiesRepository
    ) { }

    async exec(data: UpdatePacketDto): Promise<IResponse<Packet>> {
        try {
            const response = new ResponseHelper();

            const packet = await this.packetsRepository.update(data.id, {
                user_creator: data.user_creator,
                name: data.name,
                description: data.description,
                relational_codes: data.relational_codes,
                status: data.status
            });

            const savedSpecialities = await this.packetSpecialitiesRepository.get({ packet_id: data.id });

            let specialitiesToDelete = [];
            let specialitiesToUpdate = [];
            let specialitiesToCreate = [];

            /*
                Validate savedSpecialities against data.specialities, if data.specialities doesn´t contain a item of savedSpecialities,
                the item will be deleted, but if contains the item will be deleted from data.specialities for don't repeat items
                */
            if (data.specialities) {
                if (data.specialities.length !== 0) {
                    specialitiesToDelete = savedSpecialities.filter(sItem => {
                        const index = data.specialities.findIndex(dItem => dItem.speciality.toString() === sItem.speciality.id);
                        if (index !== -1) {

                            specialitiesToUpdate.push({
                                id: sItem.id,
                                sessions: data.specialities[index].sessions,
                                packet: packet,
                                speciality: data.specialities[index].speciality
                            });

                            data.specialities.splice(index, 1);
                            return false;
                        }
                        return true;
                    });
                } else {
                    specialitiesToDelete = savedSpecialities;
                }
            }

            specialitiesToCreate = data.specialities;

            specialitiesToCreate.forEach((speciality) => {
                this.packetSpecialitiesRepository.create({
                    sessions: speciality.sessions,
                    packet: packet,
                    speciality: speciality.speciality
                });
            });

            specialitiesToUpdate.forEach((speciality) => {
                this.packetSpecialitiesRepository.update(speciality.id, speciality);
            });

            specialitiesToDelete.forEach((speciality) => {
                this.packetSpecialitiesRepository.delete(speciality.id)
            });

            response.result(packet);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}