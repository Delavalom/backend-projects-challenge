import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseTimeMiddleware } from './middleware/responseTime.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  app.use(ResponseTimeMiddleware)
  await app.listen(3000);
}
bootstrap();
