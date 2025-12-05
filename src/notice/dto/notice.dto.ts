import { ApiProperty } from '@nestjs/swagger';

export class NoticeDto {
  @ApiProperty({
    description: '사용자 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  userId: string;

  @ApiProperty({
    description: '공지사항 제목',
    example: '2025년 새해 특별기도 안내',
    required: true,
  })
  title: string;

  @ApiProperty({
    description: '공지사항 내용',
    example: '새해를 맞이하여 천태사에서 특별기도를 진행합니다.',
    required: true,
  })
  content: string;

  @ApiProperty({
    description: '카테고리',
    example: '공지사항',
    required: false,
  })
  category?: string;

  @ApiProperty({
    description: '갤러리 ID 배열 (공지사항에 첨부할 이미지들)',
    example: [
      '550e8400-e29b-41d4-a716-446655440000',
      '660e8400-e29b-41d4-a716-446655440001',
    ],
    type: [String],
    required: false,
  })
  galleryIds?: string[];
}
