import { ApiProperty } from '@nestjs/swagger';

export class GalleryDto {
  @ApiProperty({
    description: '이미지 이름',
    example: '청태사 대웅전',
    required: true,
  })
  imageName: string;

  @ApiProperty({
    description: '이미지 설명',
    example: '청태사 대웅전의 아름다운 모습입니다.',
    required: false,
  })
  imageDescription?: string;

  @ApiProperty({
    description: '이미지 URL',
    example: 'https://s3.amazonaws.com/bucket/image.jpg',
    required: true,
  })
  imageUrl: string;
}
