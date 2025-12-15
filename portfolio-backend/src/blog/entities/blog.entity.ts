import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  excerpt: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  author: string;

  @Column({ type: 'date' })
  publishedAt: Date;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 5 })
  readTime: number; // in minutes

  @Column({ default: true })
  published: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}