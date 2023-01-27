import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet())
  app.setGlobalPrefix('api/v1')

  app.use(compression())
  await app.listen(3000);
}
bootstrap();
