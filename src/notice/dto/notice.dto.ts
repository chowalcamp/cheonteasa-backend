import { ApiProperty } from '@nestjs/swagger';

export class NoticeDto {
  @ApiProperty({
    description: '공지사항 제목',
    example: '2025년 새해 특별기도 안내',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: '공지사항 내용',
    example: '새해를 맞이하여 천태사에서 특별기도를 진행합니다.',
    required: false,
  })
  content?: string;

  @ApiProperty({
    description: '카테고리',
    example: '공지사항',
    required: false,
  })
  category?: string;

  @ApiProperty({
    description: '작성자',
    example: '천태사 관리자',
    required: false,
  })
  author?: string;

  @ApiProperty({
    description: '이미지 URL 배열',
    example: ['https://s3.amazonaws.com/image1.jpg'],
    type: [String],
    required: false,
  })
  images?: string[];
}
