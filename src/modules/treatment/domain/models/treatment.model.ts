import { ManagementType } from "src/modules/general/domain/models/management-type.model";
import { Packet } from "src/modules/packet/domain/models/packet.model";
import { Patient } from "src/modules/patient/domain/models/patient.model";

export class Treatment {
    id?: number;
    user_creator: number;
    code: string;
    name?: string;
    acceptance_rate: number;
    status: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    packet: Packet;
    patient: Patient;
    type_status_treatment: ManagementType;

    constructor(id: number = null) {
        this.id = id;
    }
}