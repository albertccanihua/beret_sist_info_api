import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';
import { UserModule } from './modules/user/infrastructure/bootstrap/user.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { AuthModule } from './modules/auth/auth.module';
import { GeneralModule } from './modules/general/general.module';

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
    DoctorModule,
    PatientModule,
    UserModule,
    RecipeModule,
    AppointmentModule,
    AuthModule,
    GeneralModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
