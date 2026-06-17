# 댓글 및 별점 시스템 구현 문서 (Comment & Rating System)

본 문서는 '캠퍼스 중고 교재 거래 사이트' 프로젝트의 **댓글 및 별점 기능**에 대한 기술적 구현 상세를 담고 있습니다.

## 1. 개요
*   **목적**: 구매자와 판매자 간의 소통(문의) 및 거래 완료 후 만족도 평가(후기) 기능 제공.
*   **담당**: 댓글 & 별점 파트 (김태희)
*   **주요 기능**:
    *   교재 상세 페이지별 댓글 목록 조회
    *   별점(1~5점) 및 텍스트 기반 댓글 등록
    *   작성자 본인 댓글 삭제 기능
    *   실시간 평균 별점 반영 및 UI 레이아웃 최적화

## 2. 기술 스택
*   **Backend**: Java 21, Spring Boot 3.x, Lombok
*   **Frontend**: React, Axios, React-Router-DOM
*   **API Protocol**: REST API (JSON)

## 3. 백엔드 아키텍처 (Backend)

### 3.1 도메인 모델 (`domain.comment`)
*   **Entity**: `Comment` (ID, BookID, 작성자, 내용, 별점, 생성시간)
*   **Repository**: `CommentRepository` (메모리 기반 `BaseRepository` 상속, `bookId` 필터링 지원)
*   **Service**: `CommentService` (비즈니스 로직 처리, 작성자 검증, ID 자동 생성)
*   **Controller**: `CommentController` (REST 엔드포인트 노출)

### 3.2 데이터 전송 객체 (DTO)
*   `CommentRequest`: 등록 요청 데이터 (content, rating)
*   `CommentResponse`: 응답용 데이터 (ID, 작성자 정보 등 포함)

## 4. 프론트엔드 아키텍처 (Frontend)

### 4.1 컴포넌트 구조 (`features/comment`)
1.  **CommentContainer**: 전체 댓글 시스템을 관리하는 부모 컴포넌트. API 호출 및 상태 관리 담당.
2.  **CommentForm**: 댓글 입력 및 별점 선택 폼. 유효성 검사 및 등록 요청 담당.
3.  **CommentList**: 댓글 목록 렌더링 및 삭제 기능 호출.
4.  **StarRating**: 별 모양의 평점 표시 및 선택용 공통 컴포넌트.

### 4.2 주요 API 연동 (`ApiService.js`)
*   `getComments(bookId)`: GET `/api/books/{bookId}/comments`
*   `addComment(bookId, data)`: POST `/api/books/{bookId}/comments`
*   `deleteComment(bookId, commentId)`: DELETE `/api/books/{bookId}/comments/{commentId}`

## 5. UI/UX 디자인 특징
*   **레이아웃**: 가로 너비 최대 `1600px` (화면의 95%)로 확장하여 대화면 최적화.
*   **입력창(Textarea)**:
    *   크기 고정 (`resize: none`)으로 UI 일관성 유지.
    *   내용이 길어질 경우 내부 스크롤 기능 활성화.
    *   넉넉한 높이(120px)와 폰트 크기 조정으로 가독성 향상.
*   **반응형**: `width: 95%` 설정을 통해 다양한 해상도 대응.

## 6. 테스트 계정
*   **Admin**: ID `admin` / PW `1234`
*   **Test**: ID `test` / PW `1234`

---
*작성일: 2026-06-16*  
*작성자: Gemini CLI (Collaborated with 김태희)*
