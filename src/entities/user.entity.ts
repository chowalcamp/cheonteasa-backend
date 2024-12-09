import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;
}
