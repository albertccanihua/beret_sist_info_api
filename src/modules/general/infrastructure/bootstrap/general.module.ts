import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagementTypeEntity } from "../entities/management-type.entity";
import { ManagementTypesController } from "../controllers/management-types.controller";
import { ManagementTypesRepositoryImpl } from "../repository/management-types.repositoryimpl";
import { InitialDataController } from "../controllers/initial-data.controller";
import { UploadDataController } from "../controllers/upload-data.controller";
import { PatientModule } from "src/modules/patient/infrastructure/bootstrap/patient.module";
import { PacketModule } from "src/modules/packet/infrastructure/bootstrap/packet.module";
import { TreatmentModule } from "src/modules/treatment/infrastructure/bootstrap/treatment.module";
import { UserModule } from "src/modules/user/infrastructure/bootstrap/user.module";
import { SpecialityModule } from "src/modules/speciality/infrastructure/bootstrap/speciality.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ManagementTypeEntity
        ]),
        PatientModule,
        PacketModule,
        forwardRef(() => TreatmentModule),
        UserModule,
        SpecialityModule
    ],
    controllers: [
        ManagementTypesController,
        InitialDataController,
        UploadDataController
    ],
    providers: [
        ManagementTypesRepositoryImpl
    ],
    exports: [
        ManagementTypesRepositoryImpl
    ]
})
export class GeneralModule { }