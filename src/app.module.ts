import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/infrastructure/bootstrap/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SpecialityModule } from './modules/speciality/infrastructure/bootstrap/speciality.module';
import { PacketModule } from './modules/packet/infrastructure/bootstrap/packet.module';
import { GeneralModule } from './modules/general/infrastructure/bootstrap/general.module';
import { PatientModule } from './modules/patient/infrastructure/bootstrap/patient.module';

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
    UserModule,
    SpecialityModule,
    PacketModule,
    GeneralModule,
    PatientModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
