import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Gallery } from './gallery.entity';

@Entity()
export class Notice {
  @ApiProperty({
    description: '공지사항 ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '사용자 ID',
    example: 1,
    required: false,
  })
  @Column({ nullable: true })
  userId?: number;

  @ApiProperty({
    description: '공지사항 제목',
    example: '2025년 새해 특별기도 안내',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: '공지사항 내용',
    example: '새해를 맞이하여 천태사에서 특별기도를 진행합니다.',
  })
  @Column('text')
  content: string;

  @ApiProperty({
    description: '카테고리',
    example: '공지사항',
  })
  @Column({ length: 100, nullable: true })
  category?: string;

  @ApiProperty({
    description: '조회수',
    example: 150,
  })
  @Column({ default: 0 })
  viewCount: number;

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
  @ManyToOne(() => User, (user) => user.notices)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Gallery, (gallery) => gallery.notices)
  @JoinTable({
    name: 'notice_gallery',
    joinColumn: { name: 'noticeId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'galleryId', referencedColumnName: 'id' },
  })
  galleries: Gallery[];
}
