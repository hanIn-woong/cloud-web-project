# 캠퍼스 중고 교재 거래 사이트 — API 명세서

> 작성일: 2026-06-16  
> ※ 현재 구현된 백엔드 코드와 DTO 구조를 바탕으로 업데이트되었습니다.

---

## 공통 사항

**Base URL**
```
http://localhost:8080
```

**공통 응답 포맷 (ApiResponse)**
```json
{
  "success": true,
  "data": { ... },
  "message": null
}
```
*   `success`: 요청 처리 성공 여부
*   `data`: 실제 응답 데이터 (에러 발생 시 `null`)
*   `message`: 결과 메시지 (성공 시 보통 `null`, 에러 시 에러 내용)

**인증 방식**
*   HTTP Session 기반 인증을 사용합니다.
*   인증이 필요한 API는 🔒 표시. 비로그인 상태로 요청 시 `401` 혹은 `400(로그인이 필요합니다)` 반환.

---

## 1. 회원 & 인증 (AuthController)

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|-----------|------|------|
| POST | `/api/auth/signup` | 회원가입 | ❌ |
| POST | `/api/auth/login` | 로그인 | ❌ |
| POST | `/api/auth/logout` | 로그아웃 | 🔒 |
| GET | `/api/auth/me` | 내 정보 조회 | 🔒 |

**회원가입 요청 Body**
```json
{
  "userId": "user123",
  "password": "password123",
  "name": "홍길동",
  "major": "컴퓨터공학"
}
```

**로그인 요청 Body**
```json
{
  "userId": "user123",
  "password": "password123"
}
```

**내 정보 응답 예시 (data)**
```json
{
  "id": 1,
  "userId": "user123",
  "name": "홍길동",
  "major": "컴퓨터공학"
}
```

---

## 2. 교재 목록 & 검색 (BookController - 구현 예정)

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|-----------|------|------|
| GET | `/api/books` | 전체 교재 목록 조회 | ❌ |
| GET | `/api/books/{id}` | 교재 상세 조회 | ❌ |
| GET | `/api/books/search?keyword={keyword}` | 교재 검색 | ❌ |

**교재 목록 응답 예시 (data)**
```json
[
  {
    "id": 1,
    "title": "데이터베이스 개론",
    "author": "이석호",
    "publisher": "정익사",
    "price": 15000,
    "condition": "상",
    "seller": "김철수"
  }
]
```

---

## 3. 교재 등록 & 수정 (BookController - 구현 예정)

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|-----------|------|------|
| POST | `/api/books` | 교재 등록 | 🔒 |
| PUT | `/api/books/{id}` | 교재 수정 | 🔒 |
| DELETE | `/api/books/{id}` | 교재 삭제 | 🔒 |

**교재 등록 요청 Body**
```json
{
  "title": "데이터베이스 개론",
  "author": "이석호",
  "publisher": "정익사",
  "price": 15000,
  "condition": "상"
}
```

---

## 4. 댓글 & 별점 (CommentController - 구현 예정)

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|-----------|------|------|
| GET | `/api/books/{bookId}/comments` | 교재별 댓글 목록 조회 | ❌ |
| POST | `/api/books/{bookId}/comments` | 댓글 등록 | 🔒 |
| DELETE | `/api/books/{bookId}/comments/{commentId}` | 댓글 삭제 | 🔒 |

**댓글 등록 요청 Body**
```json
{
  "content": "책 상태가 궁금합니다!",
  "rating": 5
}
```

---

## 5. 마이페이지 & 찜 (WishlistController - 구현 예정)

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|-----------|------|------|
| GET | `/api/members/me/books` | 내가 등록한 교재 목록 | 🔒 |
| GET | `/api/members/me/wishes` | 찜 목록 조회 | 🔒 |
| POST | `/api/books/{bookId}/wish` | 찜 추가 | 🔒 |
| DELETE | `/api/books/{bookId}/wish` | 찜 취소 | 🔒 |

---

## 에러 응답 포맷

백엔드의 `GlobalExceptionHandler`에 의해 다음과 같이 공통 포맷으로 반환됩니다.

| HTTP 상태코드 | 의미 |
|-------------|------|
| 400 | 잘못된 요청 (필드 누락, 비즈니스 로직 오류 등) |
| 500 | 서버 내부 오류 |

**에러 응답 예시**
```json
{
  "success": false,
  "data": null,
  "message": "이미 사용 중인 아이디입니다."
}
```
