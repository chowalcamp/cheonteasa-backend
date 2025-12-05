import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { NoticeModule } from './notice/notice.module';
import { UploadModule } from './upload/upload.module';
import { NewsModule } from './news/news.modules';
import { GalleryModule } from './gallery/gallery.module';
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
      // dropSchema는 1회 실행 후 제거됨 (UUID 스키마 재생성 완료)
    }),
    UserModule,
    AuthModule,
    NoticeModule,
    UploadModule,
    NewsModule,
    GalleryModule,
  ],
})
export class AppModule {}
