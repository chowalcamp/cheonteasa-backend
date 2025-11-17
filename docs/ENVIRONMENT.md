# 환경 설정 가이드

## 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경 변수를 설정해야 합니다.

### .env 파일 예시

```bash
# Database Configuration
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=cheonteasa

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=ap-northeast-2
AWS_S3_BUCKET=your_bucket_name

# Server Configuration
PORT=3000
NODE_ENV=development
```

## 필수 환경 변수

### 데이터베이스 설정

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `DB_TYPE` | 데이터베이스 타입 | `mysql` |
| `DB_HOST` | 데이터베이스 호스트 | `localhost` 또는 `127.0.0.1` |
| `DB_PORT` | 데이터베이스 포트 | `3306` |
| `DB_USERNAME` | 데이터베이스 사용자명 | `root` |
| `DB_PASSWORD` | 데이터베이스 비밀번호 | `your_password` |
| `DB_DATABASE` | 데이터베이스 이름 | `cheonteasa` |

### AWS S3 설정

| 변수명 | 설명 | 필수 여부 |
|--------|------|-----------|
| `AWS_ACCESS_KEY_ID` | AWS 액세스 키 ID | 필수 |
| `AWS_SECRET_ACCESS_KEY` | AWS 시크릿 액세스 키 | 필수 |
| `AWS_REGION` | AWS 리전 | 필수 |
| `AWS_S3_BUCKET` | S3 버킷 이름 | 필수 |

### 서버 설정

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `PORT` | 서버 포트 | `3000` |
| `NODE_ENV` | 실행 환경 | `development` |

## 환경별 설정

### 개발 환경 (Development)

```bash
NODE_ENV=development
PORT=3000
DB_HOST=localhost
```

### 프로덕션 환경 (Production)

```bash
NODE_ENV=production
PORT=3000
DB_HOST=your_production_host
# 프로덕션에서는 synchronize를 false로 설정하는 것을 권장합니다
```

## 데이터베이스 마이그레이션

현재 프로젝트는 `synchronize: true` 설정으로 TypeORM이 자동으로 데이터베이스 스키마를 동기화합니다.

⚠️ **주의**: 프로덕션 환경에서는 `synchronize: false`로 설정하고, 별도의 마이그레이션 스크립트를 사용하는 것을 권장합니다.

## MySQL 데이터베이스 생성

MySQL 데이터베이스를 먼저 생성해야 합니다:

```sql
CREATE DATABASE cheonteasa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

또는 MySQL 클라이언트에서:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE cheonteasa;
USE cheonteasa;
```

## AWS S3 설정

### 1. S3 버킷 생성
1. AWS 콘솔에서 S3 서비스로 이동
2. 새 버킷 생성
3. 버킷 이름 입력 (예: `cheonteasa-images`)
4. 리전 선택 (예: `ap-northeast-2`)

### 2. IAM 사용자 생성 및 권한 설정
1. IAM 콘솔에서 새 사용자 생성
2. 프로그래매틱 액세스 선택
3. S3 접근 권한 부여:
   - `AmazonS3FullAccess` 또는
   - 커스텀 정책으로 필요한 버킷에만 접근 허용

### 3. 액세스 키 발급
1. 사용자 생성 후 액세스 키 ID와 시크릿 키를 안전하게 보관
2. `.env` 파일에 추가

## 환경 변수 확인

서버를 실행하기 전에 환경 변수가 제대로 설정되었는지 확인:

```bash
# .env 파일 확인
cat .env

# 또는 Node.js에서 확인
node -e "require('dotenv').config(); console.log(process.env.DB_HOST)"
```

## 문제 해결

### 데이터베이스 연결 실패

```
Error: Wrong driver: "undefined" given
```

**해결 방법**: `.env` 파일에 `DB_TYPE=mysql`이 설정되어 있는지 확인

### AWS S3 업로드 실패

```
Error: Missing credentials in config
```

**해결 방법**: AWS 자격 증명이 `.env` 파일에 올바르게 설정되어 있는지 확인

### 포트 충돌

```
Error: listen EADDRINUSE: address already in use :::3000
```

**해결 방법**: 
1. 다른 포트 사용: `.env` 파일에서 `PORT=3001`로 변경
2. 또는 실행 중인 프로세스 종료:
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

## 보안 주의사항

1. ⚠️ **절대로 `.env` 파일을 Git에 커밋하지 마세요**
2. `.env`는 `.gitignore`에 포함되어 있어야 합니다
3. 프로덕션 환경에서는 환경 변수를 서버 환경에서 직접 설정하세요
4. AWS 키는 정기적으로 교체하세요
5. 데이터베이스 비밀번호는 강력한 것을 사용하세요

## 추가 참고 자료

- [TypeORM 공식 문서](https://typeorm.io/)
- [AWS S3 문서](https://docs.aws.amazon.com/s3/)
- [NestJS Configuration](https://docs.nestjs.com/techniques/configuration)

