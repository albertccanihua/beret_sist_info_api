import { Controller, Post } from "@nestjs/common";
import { CreateInitialDataDto } from "../../application/dto/create-initial-data.dto";
import { CreateInitialDataUseCase } from "../../application/usecases/create-initial-data.usecase";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Controller('initial-data')
export class InitialDataController {

    constructor(
        private eventEmitter: EventEmitter2
    ) { }

    @Post()
    create(data: CreateInitialDataDto) {
    }


}