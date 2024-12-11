import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  content?: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;
}
