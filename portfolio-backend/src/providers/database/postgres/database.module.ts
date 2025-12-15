import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Blog } from 'src/blog/entities/blog.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Admin } from 'src/auth/entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get('database.postgres');
        // console.log('Database Config:', dbConfig); // Debug log
        const options: TypeOrmModuleOptions = {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.name,
          ssl: dbConfig.enableSSL,
          entities: [Admin, Blog, Contact, Project, Skill],
          synchronize: true, // for dev only
          logging: false, // Enable query logging
        };
        return options;
      },
    }),
    // TypeOrmModule.forFeature(entities, 'user-db'),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
