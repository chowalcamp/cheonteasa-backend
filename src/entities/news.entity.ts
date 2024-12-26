import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  content?: string;

  @Column('json', { nullable: true })
  images?: string[];
}
