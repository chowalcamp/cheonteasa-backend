import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Notice } from './notice.entity';

@Entity()
export class Gallery {
  @ApiProperty({
    description: '갤러리 ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '사용자 ID',
    example: 1,
  })
  @Column()
  userId: number;

  @ApiProperty({
    description: '이미지 이름',
    example: '천태사 대웅전',
  })
  @Column({ nullable: true })
  imageName: string;

  @ApiProperty({
    description: '이미지 설명',
    example: '천태사 대웅전의 아름다운 모습입니다.',
  })
  @Column({ nullable: true })
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

  // 관계 설정
  @ManyToOne(() => User, (user) => user.galleries)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Notice, (notice) => notice.galleries)
  notices: Notice[];
}
