import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientEntity } from "../entities/patient.entity";
import { PatientsController } from "../controllers/patients.controller";
import { PatientsRepositoryImpl } from "../repository/patient.repositoryimpl";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PatientEntity
        ])
    ],
    controllers: [
        PatientsController
    ],
    providers: [
        PatientsRepositoryImpl
    ],
    exports: [
        PatientsRepositoryImpl
    ]
})
export class PatientModule { }