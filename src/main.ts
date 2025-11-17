import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('청태사 Backend API')
    .setDescription('청태사 백엔드 API 문서입니다.')
    .setVersion('1.0')
    .addTag('auth', '인증 관련 API')
    .addTag('news', '뉴스 관련 API')
    .addTag('notice', '공지사항 관련 API')
    .addTag('upload', '파일 업로드 관련 API')
    .addTag('users', '사용자 관련 API')
    .addCookieAuth('authToken', {
      type: 'apiKey',
      in: 'cookie',
      name: 'authToken',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
