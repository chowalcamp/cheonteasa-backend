import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('images')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImages(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.uploadService.uploadImages([file]);
    return { url: imageUrl };
  }
}
