import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); // 쿠키 파서 미들웨어 추가

  // 전역 Validation Pipe 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 없는 속성 제거
      forbidNonWhitelisted: true, // DTO에 없는 속성 있으면 에러
      transform: true, // 자동 형변환
      transformOptions: {
        enableImplicitConversion: true, // 암시적 형변환 활성화
      },
    }),
  );

  // 전역 Guard 설정 (GET 요청 제외 모든 API 인증 필요)
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));

  // CORS 설정
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
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
    .setTitle('천태사 Backend API')
    .setDescription('천태사 백엔드 API 문서입니다.')
    .setVersion('1.0')
    .addTag('auth', '인증 관련 API')
    .addTag('news', '뉴스 관련 API')
    .addTag('notice', '공지사항 관련 API')
    .addTag('upload', '파일 업로드 관련 API')
    .addTag('users', '사용자 관련 API')
    .addTag('gallery', '갤러리 관련 API')
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
