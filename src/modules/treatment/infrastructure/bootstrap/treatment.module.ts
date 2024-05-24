import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TreatmentEntity } from "../entities/treatment.entity";
import { TreatmentSpecialityEntity } from "../entities/treatment-speciality.entity";
import { TreatmentAssistanceEntity } from "../entities/treatment-assistance.entity";
import { TreatmentsRepositoryImpl } from "../repository/treatments.repositoryimpl";
import { TreatmentSpecialitiesRepositoryImpl } from "../repository/treatment-specialities.repositoryimpl";
import { TreatmentAssistancesRepositoryImpl } from "../repository/treatment-assistances.repositoryimpl";
import { TreatmentsController } from "../controllers/treatments.controller";
import { PacketModule } from "src/modules/packet/infrastructure/bootstrap/packet.module";
import { GeneralModule } from "src/modules/general/infrastructure/bootstrap/general.module";
import { TreatmentRequestEntity } from "../entities/treatment-request.entity";
import { TreatmentRequestController } from "../controllers/treatment-requests.controller";
import { TreatmentRequestsRepositoryImpl } from "../repository/treatment-request.repositoryimpl";
import { TreatmentAssistancesController } from "../controllers/treatment-assistances.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TreatmentEntity,
            TreatmentSpecialityEntity,
            TreatmentAssistanceEntity,
            TreatmentRequestEntity
        ]),
        PacketModule,
        forwardRef(() => GeneralModule)
    ],
    controllers: [
        TreatmentsController,
        TreatmentRequestController,
        TreatmentAssistancesController
    ],
    providers: [
        TreatmentsRepositoryImpl,
        TreatmentSpecialitiesRepositoryImpl,
        TreatmentAssistancesRepositoryImpl,
        TreatmentRequestsRepositoryImpl
    ],
    exports: [
        TreatmentsRepositoryImpl,
        TreatmentSpecialitiesRepositoryImpl,
        TreatmentAssistancesRepositoryImpl,
        TreatmentRequestsRepositoryImpl
    ]
})
export class TreatmentModule { }