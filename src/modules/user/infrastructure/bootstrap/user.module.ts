import { Module } from '@nestjs/common';
import { UsersRepositoryImpl } from '../repository/users.repositoryimpl';
import { UsersController } from '../controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../application/strategies/jwt.strategy';

@Module({
  controllers: [
    UsersController
  ],
  providers: [
    UsersRepositoryImpl,
    JwtStrategy
  ],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        return {
          secret: 'this_is_a_new_backend_passport_authentication_token',
          signOptions: {
            expiresIn: '2h'
          }
        }
      },
    })
  ],
  exports: [
    UsersRepositoryImpl,
    TypeOrmModule,
    JwtStrategy,
    PassportModule,
    JwtModule
  ]
})
export class UserModule { }
