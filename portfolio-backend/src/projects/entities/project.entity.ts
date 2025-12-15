import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  contributions: string;

  @Column('simple-array')
  stack: string[];

  @Column('text')
  challenges: string;

  @Column('text')
  achievements: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  liveUrl: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: 0 })
  order: number;

  @Column({ default: true })
  featured: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}