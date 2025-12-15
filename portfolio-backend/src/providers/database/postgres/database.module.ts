import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Blog } from '../../../blog/entities/blog.entity';
import { Contact } from '../../../contact/entities/contact.entity';
import { Skill } from '../../../skills/entities/skill.entity';
import { Project } from '../../..//projects/entities/project.entity';
import { Admin } from '../../../auth/entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const isProd = configService.get('NODE_ENV') === 'production';

        // 🔴 PRODUCTION (Render)
        if (isProd) {
          return {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            ssl: {
              rejectUnauthorized: false,
            },
            synchronize: true, // ✅ NEVER true in prod
            logging: false,
          };
        }

        // 🟢 LOCAL DEVELOPMENT
        const dbConfig = configService.get('database.postgres');

        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.name,
          entities: [Admin, Blog, Contact, Project, Skill],
          synchronize: true, // ✅ dev only
          logging: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
