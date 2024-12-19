import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { Notice } from 'src/entities/notice.entity';
import { NoticeModule } from '../notice/notice.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notice]), NoticeModule],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
