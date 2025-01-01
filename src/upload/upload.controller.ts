import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('images')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImages(
    @Body() body: { noticeId: number },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { noticeId } = body;
    const imageUrl = await this.uploadService.uploadImages(noticeId, [file]);
    return { url: imageUrl };
  }
}
