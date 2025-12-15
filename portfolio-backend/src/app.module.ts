import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { ContactModule } from './contact/contact.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import e from 'express';
import { Blog } from './blog/entities/blog.entity';
import { Contact } from './contact/entities/contact.entity';
import { Project } from './projects/entities/project.entity';
import { Skill } from './skills/entities/skill.entity';
import { DatabaseModule } from './providers/database/postgres/database.module';
import { AuthModule } from './auth/auth.module';
import { Admin } from './auth/entities/admin.entity';

@Module({
  imports: [
   ConfigModule.forRoot({
    isGlobal: true,
    load: [databaseConfig, appConfig],
   }),
   TypeOrmModule.forFeature([Admin,Blog,Contact,Project,Skill]),

  DatabaseModule, AuthModule, BlogModule, ProjectsModule, SkillsModule, ContactModule],
})
export class AppModule {}
