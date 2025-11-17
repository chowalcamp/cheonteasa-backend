# 청태사 Backend API

NestJS 기반의 청태사 백엔드 API 서버입니다.

## 📚 API 문서

프로젝트의 API 문서는 두 가지 방식으로 제공됩니다:

### 1. Swagger UI (권장)
개발 서버 실행 후 브라우저에서 다음 URL로 접속하세요:
```
http://localhost:3000/api
```
인터랙티브한 API 문서를 통해 직접 API를 테스트할 수 있습니다.

### 2. 마크다운 문서
[docs/API.md](./docs/API.md) 파일에서 전체 API 명세를 확인할 수 있습니다.

자세한 내용은 [docs/README.md](./docs/README.md)를 참고하세요.

## 설치

```bash
$ yarn install
```

## 환경 설정

프로젝트 루트에 `.env` 파일을 생성하고 필요한 환경 변수를 설정해야 합니다.

```bash
# .env 파일 예시
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=cheonteasa

# AWS S3 설정
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-northeast-2
AWS_S3_BUCKET=your_bucket_name
```

자세한 환경 설정 가이드는 [docs/ENVIRONMENT.md](./docs/ENVIRONMENT.md)를 참고하세요.

## 실행

```bash
# 개발 모드
$ yarn run start:dev

# 프로덕션 모드
$ yarn run start:prod

# 일반 실행
$ yarn run start
```

서버 실행 후 `http://localhost:3000/api`에서 Swagger UI를 확인할 수 있습니다.

## 테스트

```bash
# 유닛 테스트
$ yarn run test

# e2e 테스트
$ yarn run test:e2e

# 테스트 커버리지
$ yarn run test:cov
```

## 주요 기능

- 🔐 **인증**: 쿠키 기반 사용자 인증
- 📰 **뉴스**: 뉴스 CRUD 관리
- 📢 **공지사항**: 공지사항 CRUD 관리
- 📤 **파일 업로드**: AWS S3 이미지 업로드
- 👥 **사용자 관리**: 사용자 생성 및 조회

## 기술 스택

- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **Database**: MySQL (TypeORM)
- **File Storage**: AWS S3
- **Documentation**: Swagger/OpenAPI

## API 엔드포인트

| 카테고리 | Endpoint | 설명 |
|---------|----------|------|
| 인증 | `POST /auth/login` | 로그인 |
| 뉴스 | `GET/POST/DELETE /news` | 뉴스 관리 |
| 공지사항 | `GET/POST/DELETE /notice` | 공지사항 관리 |
| 업로드 | `POST /upload/images` | 이미지 업로드 |
| 사용자 | `GET/POST /users` | 사용자 관리 |

상세한 API 명세는 Swagger UI 또는 [docs/API.md](./docs/API.md)를 참고하세요.

## 라이센스

Nest is [MIT licensed](LICENSE).
