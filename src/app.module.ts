import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/infrastructure/bootstrap/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GeneralModule } from './modules/general/general.module';
import { SpecialityModule } from './modules/speciality/infrastructure/bootstrap/speciality.module';

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
    AuthModule,
    GeneralModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
