import { Module } from '@nestjs/common';
import { UsersRepositoryImpl } from '../repository/users.repositoryimpl';
import { UsersController } from '../controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ])
  ],
  controllers: [
    UsersController
  ],
  providers: [
    UsersRepositoryImpl
  ],
})
export class UserModule { }
