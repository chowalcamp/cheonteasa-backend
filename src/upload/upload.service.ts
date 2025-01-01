import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import { Notice } from 'src/entities/notice.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private s3: AWS.S3;

  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    const imageUrls: string[] = [];

    for (const file of files) {
      const fileName = `${uuidv4()}-${file.originalname}`;
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const uploadResult = await this.s3.upload(params).promise();
      const imageUrl = uploadResult.Location;
      imageUrls.push(imageUrl);
    }
    await this.noticeRepository.save({ images: imageUrls });
    return imageUrls;
  }
}
