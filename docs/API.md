# 청태사 Backend API 문서

## 기본 정보

- Base URL: `http://localhost:3000`
- API 버전: v1

## Swagger UI

개발 환경에서 Swagger UI를 통해 인터랙티브한 API 문서를 확인할 수 있습니다.

- URL: `http://localhost:3000/api`

---

## 🔐 인증 (Authentication)

### 로그인
사용자 인증을 수행합니다.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
- 성공: `200 OK` - "로그인 성공" (쿠키에 authToken 설정)
- 실패: `401 Unauthorized` - "로그인 실패"

**Cookie:**
- `authToken`: HttpOnly, Secure 쿠키로 저장됨

---

## 📰 뉴스 (News)

### 뉴스 생성
새로운 뉴스를 생성합니다.

**Endpoint:** `POST /news`

**Request Body:**
```json
{
  "title": "string",
  "content": "string"
}
```

**Response:** `201 Created`
```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

### 전체 뉴스 조회
모든 뉴스 목록을 조회합니다.

**Endpoint:** `GET /news`

**Response:** `200 OK`
```json
[
  {
    "id": "number",
    "title": "string",
    "content": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

---

### 특정 뉴스 조회
ID로 특정 뉴스를 조회합니다.

**Endpoint:** `GET /news/:id`

**Parameters:**
- `id` (path): 뉴스 ID

**Response:** `200 OK`
```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

### 뉴스 수정
기존 뉴스를 수정합니다.

**Endpoint:** `POST /news/:id`

**Parameters:**
- `id` (path): 뉴스 ID

**Request Body:**
```json
{
  "title": "string",
  "content": "string"
}
```

**Response:** `200 OK`

---

### 뉴스 삭제
뉴스를 삭제합니다.

**Endpoint:** `DELETE /news/:id`

**Parameters:**
- `id` (path): 뉴스 ID

**Response:** `200 OK`

---

## 📢 공지사항 (Notice)

### 공지사항 생성
새로운 공지사항을 생성합니다.

**Endpoint:** `POST /notice`

**Request Body:**
```json
{
  "title": "string",
  "content": "string"
}
```

**Response:** `201 Created`
```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

**Note:** 향후 업로드된 이미지 ID도 추가될 예정입니다.

---

### 전체 공지사항 조회
모든 공지사항 목록을 조회합니다.

**Endpoint:** `GET /notice`

**Response:** `200 OK`
```json
[
  {
    "id": "number",
    "title": "string",
    "content": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

---

### 특정 공지사항 조회
ID로 특정 공지사항을 조회합니다.

**Endpoint:** `GET /notice/:id`

**Parameters:**
- `id` (path): 공지사항 ID

**Response:** `200 OK`
```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

### 공지사항 수정
기존 공지사항을 수정합니다.

**Endpoint:** `POST /notice/update/:id`

**Parameters:**
- `id` (path): 공지사항 ID

**Request Body:**
```json
{
  "title": "string",
  "content": "string"
}
```

**Response:** `200 OK`

---

### 공지사항 삭제
공지사항을 삭제합니다.

**Endpoint:** `DELETE /notice/:id`

**Parameters:**
- `id` (path): 공지사항 ID

**Response:** `200 OK`

---

## 📤 업로드 (Upload)

### 이미지 업로드
이미지 파일을 S3에 업로드합니다.

**Endpoint:** `POST /upload/images`

**Request:**
- Content-Type: `multipart/form-data`
- Field name: `file`
- File type: Image files

**Response:** `201 Created`
```json
{
  "url": "string (S3 URL)"
}
```

---

## 👥 사용자 (Users)

### 사용자 생성
새로운 사용자를 생성합니다.

**Endpoint:** `POST /users`

**Request Body:**
```json
{
  "name": "string",
  "phone": "string (optional)",
  "role": "admin | user (optional, default: user)"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "name": "string",
  "phone": "string",
  "role": "admin | user",
  "createdAt": "date",
  "updatedAt": "date",
  "deletedAt": "date"
}
```

---

### 전체 사용자 조회
모든 사용자 목록을 조회합니다.

**Endpoint:** `GET /users`

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "string",
    "phone": "string",
    "role": "admin | user",
    "createdAt": "date",
    "updatedAt": "date",
    "deletedAt": "date"
  }
]
```

---

## 오류 응답 (Error Responses)

모든 API는 다음과 같은 표준 오류 형식을 따릅니다:

```json
{
  "statusCode": "number",
  "message": "string or array",
  "error": "string"
}
```

### 일반적인 HTTP 상태 코드

- `200 OK`: 요청 성공
- `201 Created`: 리소스 생성 성공
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 필요
- `404 Not Found`: 리소스를 찾을 수 없음
- `500 Internal Server Error`: 서버 오류

---

## 추가 정보

### 인증
현재는 쿠키 기반 인증을 사용하고 있습니다. 로그인 후 받은 `authToken` 쿠키가 자동으로 요청에 포함됩니다.

### 날짜 형식
모든 날짜는 ISO 8601 형식으로 반환됩니다.
예: `2024-01-01T00:00:00.000Z`

### 페이지네이션
현재 페이지네이션은 구현되어 있지 않습니다. 향후 추가될 예정입니다.

