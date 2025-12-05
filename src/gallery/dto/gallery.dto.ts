import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class GalleryDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 1,
    required: true,
  })
  @IsNotEmpty({ message: 'userId는 필수 항목입니다.' })
  @IsNumber({}, { message: 'userId는 숫자여야 합니다.' })
  userId: number;

  @ApiProperty({
    description: '이미지 이름',
    example: '청태사 대웅전',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageName?: string;

  @ApiProperty({
    description: '이미지 설명',
    example: '청태사 대웅전의 아름다운 모습입니다.',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageDescription?: string;

  @ApiProperty({
    description: '이미지 URL',
    example: 'https://s3.amazonaws.com/bucket/image.jpg',
    required: true,
  })
  @IsNotEmpty({ message: 'imageUrl은 필수 항목입니다.' })
  @IsString()
  @IsUrl({}, { message: 'imageUrl은 올바른 URL 형식이어야 합니다.' })
  imageUrl: string;
}
