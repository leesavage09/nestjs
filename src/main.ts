import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  if (!process.env.PORT)
    throw new Error('PORT is not defined in the environment variables');

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
}
void bootstrap();
