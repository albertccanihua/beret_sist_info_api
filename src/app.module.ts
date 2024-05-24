import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/infrastructure/bootstrap/user.module';
import { SpecialityModule } from './modules/speciality/infrastructure/bootstrap/speciality.module';
import { PacketModule } from './modules/packet/infrastructure/bootstrap/packet.module';
import { GeneralModule } from './modules/general/infrastructure/bootstrap/general.module';
import { PatientModule } from './modules/patient/infrastructure/bootstrap/patient.module';
import { TreatmentModule } from './modules/treatment/infrastructure/bootstrap/treatment.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'hc_ionic_app',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EventEmitterModule.forRoot(),
    UserModule,
    SpecialityModule,
    PacketModule,
    GeneralModule,
    PatientModule,
    TreatmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
