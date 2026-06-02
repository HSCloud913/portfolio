# Portfolio

시스템 소프트웨어 개발자 최성운의 포트폴리오 웹사이트입니다.

## 구조

```
portfolio/
├── backend/   # Spring Boot REST API
└── frontend/  # React + Vite
```

## 기술 스택

**Backend**
- Java 21, Spring Boot 3.5
- Spring Security + JWT 인증
- Spring Data JPA + PostgreSQL
- Gradle (Kotlin DSL)

**Frontend**
- React 19 + TypeScript
- Vite, Tailwind CSS 4
- Framer Motion
- React Router

## 로컬 실행

### 사전 준비

- Java 21
- Docker (PostgreSQL 실행용)
- Node.js 18+

### PostgreSQL 실행

```bash
docker run -d \
  --name portfolio-db \
  -e POSTGRES_USER=portfolio \
  -e POSTGRES_PASSWORD=portfolio1234 \
  -e POSTGRES_DB=portfolio \
  -p 5432:5432 \
  postgres
```

### Backend 실행

```bash
cd backend
./gradlew bootRun
```

서버가 시작되면 관리자 계정이 자동 생성됩니다.
- 기본 계정: `admin` / `admin1234`
- API: `http://localhost:8080`

### Frontend 실행

```bash
cd frontend
npm install
npm run dev
```

- 포트폴리오: `http://localhost:5173`
- 관리 페이지: `http://localhost:5173/admin/login`

## 환경변수

Backend는 아래 환경변수를 지원하며, 미설정 시 기본값으로 동작합니다.

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `DATABASE_URL` | `jdbc:postgresql://localhost:5432/portfolio` | DB 연결 URL |
| `DATABASE_USERNAME` | `portfolio` | DB 사용자명 |
| `DATABASE_PASSWORD` | `portfolio1234` | DB 비밀번호 |
| `JWT_SECRET` | (설정 필요, 32자 이상) | JWT 서명 키 |
| `JWT_EXPIRATION` | `86400000` | 토큰 만료 시간 (ms) |
| `ADMIN_USERNAME` | `admin` | 관리자 계정 |
| `ADMIN_PASSWORD` | `admin1234` | 관리자 비밀번호 |

## API

| Method | Endpoint | 인증 | 설명 |
|--------|----------|------|------|
| POST | `/api/auth/login` | ✗ | 로그인 |
| GET | `/api/projects` | ✗ | 프로젝트 목록 |
| POST | `/api/projects` | ✓ | 프로젝트 추가 |
| PUT | `/api/projects/{id}` | ✓ | 프로젝트 수정 |
| DELETE | `/api/projects/{id}` | ✓ | 프로젝트 삭제 |
| GET | `/api/experiences` | ✗ | 경력 목록 |
| POST | `/api/experiences` | ✓ | 경력 추가 |
| PUT | `/api/experiences/{id}` | ✓ | 경력 수정 |
| DELETE | `/api/experiences/{id}` | ✓ | 경력 삭제 |
| GET | `/api/skills` | ✗ | 스킬 목록 |
| POST | `/api/skills` | ✓ | 스킬 추가 |
| PUT | `/api/skills/{id}` | ✓ | 스킬 수정 |
| DELETE | `/api/skills/{id}` | ✓ | 스킬 삭제 |