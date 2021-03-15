import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const DirectusSDK = require('@directus/sdk-js');
export const directus = new DirectusSDK('http://localhost:8055/');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  // use the directus uploads directory for a static assets storage
  app.useStaticAssets(join(__dirname, '../..', '/directus-project/uploads/'))
  await app.listen(3000);
}
bootstrap();
