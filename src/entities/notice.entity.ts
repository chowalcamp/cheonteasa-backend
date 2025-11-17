import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Notice {
  @ApiProperty({
    description: '공지사항 ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '공지사항 제목',
    example: '2025년 새해 특별기도 안내',
  })
  @Column({ nullable: true })
  title?: string;

  @ApiProperty({
    description: '공지사항 내용',
    example: '새해를 맞이하여 천태사에서 특별기도를 진행합니다.',
  })
  @Column('text', { nullable: true })
  content?: string;

  @ApiProperty({
    description: '카테고리',
    example: '공지사항',
  })
  @Column({ nullable: true, default: '공지사항' })
  category?: string;

  @ApiProperty({
    description: '작성자',
    example: '천태사 관리자',
  })
  @Column({ nullable: true, default: '천태사 관리자' })
  author?: string;

  @ApiProperty({
    description: '조회수',
    example: 150,
  })
  @Column({ default: 0 })
  viewCount: number;

  @ApiProperty({
    description: '이미지 URL 배열',
    example: ['https://s3.amazonaws.com/image1.jpg'],
    type: [String],
  })
  @Column('simple-array', { nullable: true })
  images?: string[];

  @ApiProperty({
    description: '생성일',
    example: '2025-01-15T00:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: '수정일',
    example: '2025-01-15T00:00:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: '삭제일',
    example: null,
    required: false,
  })
  @Column({ nullable: true })
  deletedAt: Date;
}
