import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const DirectusSDK = require('@directus/sdk-js');

export const directus = new DirectusSDK('http://localhost:8055/');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000);
}
bootstrap();
