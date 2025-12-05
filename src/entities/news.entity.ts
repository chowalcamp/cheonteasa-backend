import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class News {
  @ApiProperty({
    description: '뉴스 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: '뉴스 제목',
    example: '청태사 새소식',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: '뉴스 내용',
    example: '청태사에서 새로운 행사를 개최합니다.',
  })
  @Column('text')
  content: string;

  @ApiProperty({
    description: '생성일',
    example: '2025-01-15T00:00:00.000Z',
  })
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    description: '수정일',
    example: '2025-01-15T00:00:00.000Z',
  })
  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @ApiProperty({
    description: '삭제일',
    example: null,
    required: false,
  })
  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
