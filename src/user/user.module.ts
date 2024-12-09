import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // User 엔티티를 TypeORM에 등록
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
