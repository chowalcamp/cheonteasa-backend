import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { NoticeModule } from './notice/notice.module';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    NoticeModule,
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class AppModule {}
