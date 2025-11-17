import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Gallery {
  @ApiProperty({
    description: '갤러리 ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '이미지 이름',
    example: '청태사 대웅전',
  })
  @Column()
  imageName: string;

  @ApiProperty({
    description: '이미지 설명',
    example: '청태사 대웅전의 아름다운 모습입니다.',
  })
  @Column('text', { nullable: true })
  imageDescription?: string;

  @ApiProperty({
    description: '이미지 URL',
    example: 'https://s3.amazonaws.com/bucket/image.jpg',
  })
  @Column()
  imageUrl: string;

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
