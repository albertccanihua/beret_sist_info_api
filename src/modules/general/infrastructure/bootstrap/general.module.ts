import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagementTypeEntity } from "../entities/management-type.entity";
import { ManagementTypesController } from "../controllers/management-types.controller";
import { ManagementTypesRepositoryImpl } from "../repository/management-types.repositoryimpl";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ManagementTypeEntity
        ])
    ],
    controllers: [
        ManagementTypesController
    ],
    providers: [
        ManagementTypesRepositoryImpl
    ]
})
export class GeneralModule { }