import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private s3: AWS.S3;

  constructor() {
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
    return imageUrls;
  }
}
