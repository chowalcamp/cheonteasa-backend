import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Gallery } from './gallery.entity';
import { Notice } from './notice.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @ApiProperty({
    description: '사용자 고유 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: '사용자 아이디 (로그인용)',
    example: 'admin',
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'password123',
  })
  @Column()
  @Exclude() // 응답에서 비밀번호 제외
  password: string;

  @ApiProperty({
    description: '이메일',
    example: 'user@example.com',
    required: false,
  })
  @Column({ unique: true, nullable: true })
  email?: string;

  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: '전화번호',
    example: '010-1234-5678',
    required: false,
  })
  @Column({ nullable: true })
  phone?: string;

  @ApiProperty({
    description: '사용자 권한',
    example: 'MEMBER',
  })
  @Column({ length: 50, default: 'MEMBER' })
  role: string;

  @ApiProperty({
    description: '생성일',
    example: '2024-01-01T00:00:00.000Z',
  })
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    description: '수정일',
    example: '2024-01-01T00:00:00.000Z',
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
  @OneToMany(() => Gallery, (gallery) => gallery.user)
  galleries: Gallery[];

  @OneToMany(() => Notice, (notice) => notice.user)
  notices: Notice[];
}
