import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); // 쿠키 파서 미들웨어 추가

  // CORS 설정
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://port-next-cheontaesa-m4h0qv5272cd3f9d.sel4.cloudtype.app',
      'https://port-next-cheontaesa-m4h0qv5272cd3f9d.sel4.cloudtype.app',
      'https://www.cheontaesa.com',
      'https://cheontaesa.com',
    ], // 허용할 도메인 목록
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
