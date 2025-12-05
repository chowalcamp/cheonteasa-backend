import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class NoticeDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'userId는 숫자여야 합니다.' })
  userId?: number;

  @ApiProperty({
    description: '공지사항 제목',
    example: '2025년 새해 특별기도 안내',
    required: true,
  })
  @IsNotEmpty({ message: 'title은 필수 항목입니다.' })
  @IsString({ message: 'title은 문자열이어야 합니다.' })
  title: string;

  @ApiProperty({
    description: '공지사항 내용',
    example: '새해를 맞이하여 천태사에서 특별기도를 진행합니다.',
    required: true,
  })
  @IsNotEmpty({ message: 'content는 필수 항목입니다.' })
  @IsString({ message: 'content는 문자열이어야 합니다.' })
  content: string;

  @ApiProperty({
    description: '카테고리',
    example: '공지사항',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'category는 문자열이어야 합니다.' })
  category?: string;

  @ApiProperty({
    description: '갤러리 ID 배열 (공지사항에 첨부할 이미지들)',
    example: [1, 2, 3],
    type: [Number],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'galleryIds는 배열이어야 합니다.' })
  @IsNumber({}, { each: true, message: 'galleryIds의 각 요소는 숫자여야 합니다.' })
  galleryIds?: number[];
}
