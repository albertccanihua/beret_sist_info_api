import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/infrastructure/bootstrap/user.module';
import { SpecialityModule } from './modules/speciality/infrastructure/bootstrap/speciality.module';
import { PacketModule } from './modules/packet/infrastructure/bootstrap/packet.module';
import { GeneralModule } from './modules/general/infrastructure/bootstrap/general.module';
import { PatientModule } from './modules/patient/infrastructure/bootstrap/patient.module';
import { TreatmentModule } from './modules/treatment/infrastructure/bootstrap/treatment.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      })
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
