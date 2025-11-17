# 청태사 Backend API 문서

## 문서 목록

### 📖 [API.md](./API.md)
전체 API 엔드포인트에 대한 상세한 설명과 사용 예시를 포함한 문서입니다.

### ⚙️ [ENVIRONMENT.md](./ENVIRONMENT.md)
환경 변수 설정 및 데이터베이스, AWS S3 설정 가이드입니다.

### 🔗 Swagger UI
개발 서버 실행 시 다음 URL에서 인터랙티브한 API 문서를 확인할 수 있습니다:
- **URL**: `http://localhost:3000/api`

## 빠른 시작

### 1. 의존성 설치
```bash
yarn install
```

### 2. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 필요한 환경 변수를 설정하세요.
자세한 내용은 [ENVIRONMENT.md](./ENVIRONMENT.md)를 참고하세요.

```bash
# .env 파일 예시
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=cheonteasa
```

### 3. 개발 서버 실행
```bash
yarn start:dev
```

### 4. API 문서 확인
브라우저에서 `http://localhost:3000/api`를 열어 Swagger UI를 확인하세요.

## 주요 기능

- **인증 (Authentication)**: 쿠키 기반 사용자 인증
- **뉴스 (News)**: 뉴스 CRUD 작업
- **공지사항 (Notice)**: 공지사항 CRUD 작업
- **업로드 (Upload)**: 이미지 파일 S3 업로드
- **사용자 (Users)**: 사용자 관리

## 기술 스택

- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **Database**: TypeORM (MySQL)
- **File Storage**: AWS S3
- **Documentation**: Swagger/OpenAPI

## API 카테고리

| 카테고리 | Base Path | 설명 |
|---------|-----------|------|
| 인증 | `/auth` | 로그인 및 인증 관련 |
| 뉴스 | `/news` | 뉴스 관리 |
| 공지사항 | `/notice` | 공지사항 관리 |
| 업로드 | `/upload` | 파일 업로드 |
| 사용자 | `/users` | 사용자 관리 |

## 인증

현재 API는 쿠키 기반 인증을 사용합니다. 로그인 후 받은 `authToken` 쿠키가 자동으로 요청에 포함됩니다.

### 인증 방법
1. `POST /auth/login`으로 로그인
2. 응답으로 받은 쿠키가 자동으로 브라우저에 저장됨
3. 이후 요청에서 자동으로 쿠키가 포함됨

## 환경 변수

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database

# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET=your_bucket_name
```

## 개발 가이드

### 새로운 API 엔드포인트 추가하기

1. **Controller 생성**: 새로운 컨트롤러 파일 생성
2. **Swagger 데코레이터 추가**: `@ApiTags`, `@ApiOperation`, `@ApiResponse` 등
3. **DTO 정의**: 요청/응답 데이터 타입 정의 및 `@ApiProperty` 추가
4. **API.md 업데이트**: docs 폴더의 API 문서 업데이트

### Swagger 데코레이터 예시

```typescript
@ApiTags('example')
@Controller('example')
export class ExampleController {
  @Get()
  @ApiOperation({ summary: '예시 조회', description: '예시 데이터를 조회합니다.' })
  @ApiResponse({ status: 200, description: '성공' })
  getExample() {
    return { message: 'Hello World' };
  }
}
```

## 참고 자료

- [NestJS 공식 문서](https://docs.nestjs.com/)
- [Swagger/OpenAPI 문서](https://swagger.io/docs/)
- [TypeORM 문서](https://typeorm.io/)

## 문의

프로젝트 관련 문의사항은 이슈를 통해 남겨주세요.

