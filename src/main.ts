import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['asdasfaaafaa'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 미리 선언한 프로퍼티외의 추가 프로퍼티는 제거
    }),
  );
  await app.listen(3000);
}
bootstrap();
