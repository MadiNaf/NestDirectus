import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const DirectusSDK = require('@directus/sdk-js');
import { NestExpressApplication } from '@nestjs/platform-express';
export const directus = new DirectusSDK('http://localhost:8055/');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  await app.listen(3000);
}
bootstrap();
