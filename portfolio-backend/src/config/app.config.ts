import { registerAs } from '@nestjs/config';

export default registerAs('express', () => ({
  version: process.env.APP_VERSION || '1.0.0',
  port: process.env.APP_PORT || 3000,
  env: process.env.APP_ENV || 'development',
  enableCors: process.env.APP_ENABLE_CORS ? process.env.APP_ENABLE_CORS : false,
  jwt:{
    secret: process.env.APP_JWT_SECRET,
    expiresIn: process.env.APP_JWT_EXPIRES_IN ,
  }
}));
