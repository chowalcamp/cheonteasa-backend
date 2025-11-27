import { ApiProperty } from '@nestjs/swagger';

export class NewsDto {
  @ApiProperty({
    description: '뉴스 제목',
    example: '청태사 새로운 소식',
    required: true,
  })
  title: string;

  @ApiProperty({
    description: '뉴스 내용',
    example: '청태사에서 새로운 행사를 개최합니다.',
    required: true,
  })
  content: string;
}
