import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @ApiProperty({
    description: '사용자 고유 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
    enum: UserRole,
    example: UserRole.USER,
  })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({
    description: '생성일',
    example: '2024-01-01T00:00:00.000Z',
  })
  @Column()
  createdAt: Date;

  @ApiProperty({
    description: '수정일',
    example: '2024-01-01T00:00:00.000Z',
  })
  @Column()
  updatedAt: Date;

  @ApiProperty({
    description: '삭제일',
    example: '2024-01-01T00:00:00.000Z',
  })
  @Column()
  deletedAt: Date;
}
