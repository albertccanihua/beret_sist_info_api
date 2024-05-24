import { EventEmitter2 } from "@nestjs/event-emitter";
import { CreateInitialDataDto } from "../dto/create-initial-data.dto";
import { CreateInitialDataEvent } from "../events/create-initial-data.event";

export class CreateInitialDataUseCase {

    constructor(

    ) { }

    async exec(data: CreateInitialDataDto) {

    }

    private async createInitialUser() {

    }

    private async createPackets() {

    }

    private async createSpecialities() {

    }

    private async createPacketSpecialities() {

    }
}