import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpecialityEntity } from "../entities/speciality.entity";
import { SpecialitiesController } from "../controllers/specialities.controller";
import { SpecialitiesRepositoryImpl } from "../repository/speciality.repositoryimpl";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SpecialityEntity
        ])
    ],
    controllers: [
        SpecialitiesController
    ],
    providers: [
        SpecialitiesRepositoryImpl
    ],
    exports: [
        TypeOrmModule
    ]
})
export class SpecialityModule { }