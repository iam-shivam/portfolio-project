// main.ts
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getRepositoryToken } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Admin } from './auth/entities/admin.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // ------------------------------------
  // 🌐 CORS CONFIGURATION
  // ------------------------------------
  app.enableCors({
    origin: configService.get('express.enableCors')
      ? '*'
      : [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://portfolio-project-mauve-delta.vercel.app',
      ],
    credentials: true,
  });

  // ------------------------------------
  // 🔍 VALIDATION PIPE
  // ------------------------------------
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ------------------------------------
  // 🌐 GLOBAL ROUTE PREFIX
  // ------------------------------------
  app.setGlobalPrefix('api');

  // ------------------------------------
  // 📘 SWAGGER SETUP
  // ------------------------------------
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Portfolio Backend API')
    .setDescription('API documentation for Portfolio Management System')
    .setVersion('1.0')
    .addBearerAuth() // Enable JWT auth in Swagger
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument, {
    swaggerOptions: { persistAuthorization: true },
  });

  console.log('📘 Swagger available at: http://localhost:5000/api/docs');

  // ------------------------------------
  // 👑 ADMIN SEEDER
  // ------------------------------------
  const adminRepository = app.get<Repository<Admin>>(
    getRepositoryToken(Admin),
  );

  const adminEmail =
    configService.get<string>('ADMIN_EMAIL') || 'admin@gmail.com';
  const adminPassword =
    configService.get<string>('ADMIN_PASSWORD') || 'Admin@123';
  const adminName =
    configService.get<string>('ADMIN_NAME') || 'Super Admin';

  const existingAdmin = await adminRepository.findOne({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    console.log('👤 No admin found → Creating default admin account...');

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newAdmin = adminRepository.create({
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
    });

    await adminRepository.save(newAdmin);

    console.log('✅ Admin created successfully!');
    console.log(`➡ Email: ${adminEmail}`);
    console.log(`➡ Password: ${adminPassword}`);
  } else {
    console.log('✔ Admin already exists → Seeder skipped');
  }

  // ------------------------------------
  // 🚀 START SERVER
  // ------------------------------------
  const port = configService.get('PORT') || 5000;

  await app.listen(port);
  console.log(`🚀 Server running: http://localhost:${port}`);
  console.log(`📚 API available: http://localhost:${port}/api`);
}

bootstrap();
