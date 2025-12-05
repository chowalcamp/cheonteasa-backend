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

# JWT 인증
JWT_SECRET=your-very-secure-jwt-secret-key-change-this-in-production
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

- 🔐 **JWT 인증**: JWT 토큰 기반 사용자 인증 및 권한 관리
- ✍️ **회원가입/로그인**: bcrypt 비밀번호 해싱, 쿠키 기반 토큰 저장
- 🛡️ **권한 관리**: 관리자(ADMIN) / 일반회원(MEMBER) 역할 기반 접근 제어
- 📰 **뉴스**: 뉴스 CRUD 관리 (관리자 전용)
- 📢 **공지사항**: 공지사항 CRUD 관리 (로그인 필요)
- 🖼️ **갤러리**: 이미지 갤러리 관리 (로그인 필요)
- 📤 **파일 업로드**: AWS S3 이미지 업로드 (로그인 필요)
- 👥 **사용자 관리**: 사용자 생성 및 조회 (관리자 전용)

## 기술 스택

- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **Database**: MySQL (TypeORM)
- **Authentication**: JWT + Passport
- **Password**: bcrypt
- **File Storage**: AWS S3
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI

## API 엔드포인트

| 카테고리 | Endpoint | 설명 | 권한 |
|---------|----------|------|------|
| 인증 | `POST /auth/register` | 회원가입 | 공개 |
| 인증 | `POST /auth/login` | 로그인 | 공개 |
| 인증 | `POST /auth/logout` | 로그아웃 | 공개 |
| 인증 | `GET /auth/me` | 내 정보 조회 | 로그인 필요 |
| 뉴스 | `GET /news` | 뉴스 조회 | 공개 |
| 뉴스 | `POST /news` | 뉴스 생성 | 관리자 |
| 뉴스 | `POST /news/:id` | 뉴스 수정 | 관리자 |
| 뉴스 | `DELETE /news/:id` | 뉴스 삭제 | 관리자 |
| 공지사항 | `GET /notice` | 공지사항 조회 | 공개 |
| 공지사항 | `POST /notice` | 공지사항 생성 | 로그인 필요 |
| 공지사항 | `POST /notice/update/:id` | 공지사항 수정 | 로그인 필요 |
| 공지사항 | `DELETE /notice/:id` | 공지사항 삭제 | 관리자 |
| 갤러리 | `GET /gallery/list` | 갤러리 조회 | 공개 |
| 갤러리 | `POST /gallery` | 갤러리 생성 | 로그인 필요 |
| 갤러리 | `PUT /gallery/:id` | 갤러리 수정 | 로그인 필요 |
| 갤러리 | `DELETE /gallery/:id` | 갤러리 삭제 | 관리자 |
| 업로드 | `POST /upload/images` | 이미지 업로드 | 로그인 필요 |
| 사용자 | `GET /users` | 사용자 목록 조회 | 관리자 |
| 사용자 | `POST /users` | 사용자 생성 | 관리자 |

### 권한 레벨
- **공개**: 인증 불필요
- **로그인 필요**: JWT 토큰 필요 (ADMIN 또는 MEMBER)
- **관리자**: ADMIN 권한 필요

상세한 API 명세는 Swagger UI 또는 [docs/API.md](./docs/API.md)를 참고하세요.

## 라이센스

Nest is [MIT licensed](LICENSE).
