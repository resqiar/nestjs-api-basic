import * as dotenv from 'dotenv'
dotenv.config()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT: number = Number(process.env.PORT) || 3031

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
