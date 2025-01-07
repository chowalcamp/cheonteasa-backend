import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title?: string;

  @Column('json', { nullable: true })
  content?: string;

  @Column('json', { nullable: true })
  images?: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;
}
