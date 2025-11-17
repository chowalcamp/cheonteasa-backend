import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('images')
  @ApiOperation({
    summary: '이미지 업로드',
    description: '이미지 파일을 S3에 업로드합니다.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: '업로드할 이미지 파일',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '이미지가 성공적으로 업로드되었습니다.',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: 'https://s3.amazonaws.com/...' },
      },
    },
  })
  @ApiResponse({ status: 400, description: '잘못된 요청입니다.' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImages(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.uploadService.uploadImages([file]);
    return { url: imageUrl };
  }
}
