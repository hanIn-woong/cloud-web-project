# 📚 프로젝트 최종 결과 보고서

## 1. 프로젝트명
**KNU 캠퍼스 중고 교재 거래 사이트 (Campus Used Textbook Marketplace)**

## 2. 개발 목적
- 대학생들의 경제적 부담인 전공 및 교양 교재 구입 비용 절감.
- 학내 구성원 간의 신뢰 기반 거래 환경 조성.
- 종이 자원 재활용을 통한 친환경 가치 실천.
- 풀스택 웹 개발 프로세스(Spring Boot + React)의 실무적 이해 및 협업 역량 강화.

## 3. 프로젝트 소개
본 프로젝트는 강남대학교 학생들을 위한 전용 중고 교재 거래 플랫폼입니다. 학생들은 자신이 사용했던 교재를 자유롭게 판매 등록하고, 필요한 교재를 저렴하게 구매 예약할 수 있습니다. 단순한 게시판 형태를 넘어 거래 상태 관리(판매중/예약중/판매완료), 댓글 및 별점 시스템, 그리고 시스템 운영을 위한 관리자 기능까지 포함된 통합 커머스 서비스를 지향합니다.

## 4. 팀원 역할
| 팀원 | 담당 역할 및 기능 |
|------|----------|
| **조건희** | **회원 & 인증**: 회원가입, 로그인/로그아웃, 세션 기반 인증 처리 |
| **정민성** | **교재 목록 & 검색**: 메인/목록 페이지 구현, 교재 키워드 검색 필터링 |
| **김민호** | **교재 등록 & 수정**: 교재 정보 입력 폼, 게시물 수정 및 삭제 로직 |
| **김태희** | **댓글 & 별점**: 교재별 문의 댓글 작성, 평점 시스템 구현 |
| **주승준** | **마이페이지 & 찜**: 개인 프로필 관리, 관심 도서(찜) 목록화 |
| **한인웅** | **인프라 팀장 & 통합**: 프로젝트 아키텍처 설계, 구매/예약 트랜잭션 로직, 관리자 기능 구현, **GitHub Repository 환경 구축 및 Codespaces 컨테이너 설정 관리** |

## 5. 전체 프로젝트 구조 및 파일별 설명

### 📂 Backend (Spring Boot) - `backend/src/main/java/com/example/backend/`

#### 🔹 `common/` (공통 모듈)
- **`ApiResponse.java`**: 전역 표준 응답 규격 정의 (Success/Error 일관성 확보).
- **`GlobalExceptionHandler.java`**: 비즈니스 예외 및 시스템 예외를 포착하여 공통 응답으로 변환.
- **`LoginInterceptor.java` / `AdminInterceptor.java`**: 요청 전 권한 확인(로그인 여부, 관리자 권한)을 위한 인터셉터.
- **`WebConfig.java`**: 인터셉터 등록 및 CORS 설정 등 웹 환경 구성.
- **`BaseRepository.java`**: 데이터베이스 대신 `ArrayList`를 활용하여 CRUD를 지원하는 제네릭 저장소 기반 클래스.
- **`BaseEntity.java`**: 모든 엔티티의 공통 속성(ID 등) 정의.
- **`HealthController.java`**: 서비스 상태 확인을 위한 헬스체크 API.

#### 🔹 `domain/user/` (회원 및 인증)
- **`User.java`**: 회원 엔티티 및 회원 등급(UserRole) 관리.
- **`AuthController.java`**: 로그인, 회원가입, 로그아웃 등 인증 처리 API.
- **`MemberController.java`**: 내 정보 조회, 회원 탈퇴 등 회원 정보 관리 API.
- **`AuthService.java`**: 회원 가입 시 중복 검사 및 로그인 세션 처리 비즈니스 로직.

#### 🔹 `domain/book/` (교재 거래 정보)
- **`Book.java`**: 도서명, 가격, 상태, 평점 등 교재 정보 엔티티.
- **`BookStatus.java`**: `SALE`, `RESERVED`, `SOLD` 상태를 관리하는 Enum.
- **`BookController.java`**: 교재 등록, 목록 조회, 상세 조회 API.
- **`BookService.java`**: 도서 검색 필터링 및 거래 상태 변경 관리.
- **`PurchaseController.java` / `PurchaseService.java`**: 구매 예약 및 확정 시 발생하는 트랜잭션 처리(상태 변경 및 유저 연동).

#### 🔹 `domain/comment/` (댓글 및 평점 시스템)
- **`Comment.java`**: 댓글 내용 및 평점 정보 엔티티.
- **`CommentController.java`**: 도서별 댓글 작성 및 조회 API.
- **`CommentService.java`**: 댓글 추가 시 해당 도서의 평균 평점을 실시간으로 계산하여 업데이트하는 로직 포함.

#### 🔹 `domain/wishlist/` (관심 도서 관리)
- **`WishItem.java`**: 유저와 도서를 매핑하는 찜 목록 엔티티.
- **`WishlistController.java` / `WishlistService.java`**: 찜 추가/삭제 및 나의 찜 목록 조회 기능.

#### 🔹 `domain/admin/` (관리자 기능)
- **`AdminController.java`**: 전체 시스템 통계 및 관리자 전용 관리 API.
- **`AdminService.java`**: 사용자 수, 도서 수, 거래 완료 건수 등 대시보드 데이터 산출 로직.

---

### 📂 Frontend (React) - `frontend/src/`

#### 🔹 `features/` (도메인별 핵심 기능)
- **`auth/`**: `LoginPage.jsx`, `SignupPage.jsx` 및 인증 관련 API(`authApi.js`).
- **`books/`**: 도서 목록(`BookList.jsx`), 상세 보기(`BookDetail.jsx`) 및 도서 관련 API.
    - **`components/`**: 검색 바(`SearchBar.jsx`), 찜 버튼(`WishButton.jsx`), 도서 행(`BookTableRow.jsx`) 등 재사용 컴포넌트.
- **`comment/`**: `CommentContainer.jsx`, 별점 입력(`StarRating.jsx`) 등 댓글 인터페이스 관리.

#### 🔹 `pages/` (화면 단위 구성)
- **`HomePage.jsx`**: 메인 배너 및 추천 도서 요약 화면.
- **`MyPage.jsx`**: 내가 등록한 책, 구매 예약한 책 등을 확인하는 개인 대시보드.
- **`AdminPage.jsx`**: 관리자용 시스템 통계 정보 및 전체 데이터 관리 화면.
- **`BookForm.jsx`**: 교재 등록 및 수정을 위한 폼 페이지.
- **`WishList.jsx`**: 찜한 도서들을 모아보는 전용 페이지.

#### 🔹 `context/` & `common`
- **`AuthContext.jsx`**: 로그인 유저 정보 및 로그인 상태를 전역에서 참조하기 위한 컨텍스트.
- **`ToastContext.jsx`**: 작업 성공/실패 시 사용자에게 보여줄 알림 메시지 시스템.
- **`ApiService.js`**: Axios 인스턴스 설정. API 기본 URL 설정 및 401/403 에러 전역 처리.

#### 🔹 `components/` (공통 레이아웃)
- **`Header.jsx`**: 서비스 로고, 내비게이션 바 및 로그인 상태에 따른 메뉴 전환.
- **`Footer.jsx`**: 하단 저작권 및 서비스 정보.

## 6. 사용 기술 스택
- **Frontend**: React (Vite), CSS3, Axios, React Router.
- **Backend**: Java 21, Spring Boot 3.x, Lombok, Gradle.
- **Cloud & DevOps**: **GitHub Codespaces (클라우드 개발 환경)**, GitHub Actions (CI), Git.
- **Database**: In-memory (ArrayList 기반 Generic Repository 패턴).

## 7. 주요 기능 및 세부 구현 내용
1.  **실시간 거래 상태 시스템**: `SALE(판매중) -> RESERVED(예약중) -> SOLD(판매완료)`로 이어지는 상태 머신 구현.
2.  **세션 기반 인증**: 로그인 시 세션에 유저 정보를 저장하고 인터셉터를 통해 권한 없는 접근 차단.
3.  **반응형 도서 검색**: 키워드 입력 시 실시간으로 필터링된 도서 목록 노출.
4.  **댓글 및 평점**: 구매 전 문의 및 거래 후 만족도 평가 가능 (평균 별점 자동 계산).
5.  **통합 마이페이지**: 본인이 등록한 책, 예약한 책, 구매 완료된 내역을 탭 형식으로 관리.
6.  **관리자 센터 (Admin)**: 전체 사용자/도서 관리, 서비스 통계(대시보드) 제공 및 부적절한 데이터 강제 삭제 기능.

## 8. 프로젝트의 차별성
- **강남대학교 맞춤형 디자인**: 대학교 로고 및 브랜드 컬러(#004798)를 적용하여 소속감과 신뢰도 향상.
- **엄격한 상태 관리**: 단순 게시판이 아닌 구매 프로세스를 코드 레벨에서 정의하여 거래의 안전성 확보.
- **클라우드 네이티브 개발 환경**: GitHub Codespaces를 도입하여 팀원 간 동일한 개발 환경 유지 및 이식성 극대화.

## 9. 개발 과정 및 문제 해결
- **문제**: API 호출 시 반복되는 성공 체크 및 에러 핸들링으로 인한 코드 복잡성.
- **해결**: `ApiService.js`에 전역 인터셉터를 구현하여 응답 처리 로직을 단일화.
- **문제**: 관리자 기능 추가 시 일반 유저 권한과의 충돌 및 보안 취약점 우려.
- **해결**: `AdminInterceptor`와 `AdminRoute`를 통한 백엔드/프론트엔드 이중 보안 체계 구축.

## 10. 개선사항
- **이미지 업로드**: 실제 교재 상태 확인을 위한 이미지 파일 업로드 및 미리보기 기능 추가 필요.
- **실시간 알림**: 예약 및 거래 완료 상태를 판매자에게 실시간으로 전송하는 기능(WebSocket 등) 도입.
- **영속성 DB 전환**: 현재 메모리 저장 방식에서 MySQL/H2 등 관계형 데이터베이스로의 전환.

## 11. 기타 강조하고 싶은 내용
- **표준화된 협업 프로세스**: '공통 인프라 가이드'를 통해 팀원들이 일관된 규격을 준수하며 개발할 수 있는 기반 마련.
- **클라우드 친화적 구조**: `.devcontainer` 설정을 통해 인프라 팀장이 구축한 환경을 팀원들이 즉시 복제하여 사용할 수 있는 효율적인 워크플로우 완성.
