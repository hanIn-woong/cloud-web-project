# cloud-web-project
클라우드기반웹개발 프로젝트 3팀

# 캠퍼스 중고 교재 거래 사이트

학습 목적 풀스택 팀 프로젝트

## 기술 스택
- Frontend: React, Vite
- Backend: Spring MVC, Java 21
- 인프라: GitHub Actions, GitHub Codespaces

## 팀원 & 담당 기능
| 팀원 | 담당 기능 |
|------|----------|
| 조건희 | 회원 & 인증 |
| 정민성 | 교재 목록 & 검색 |
| 김민호 | 교재 등록 & 수정 |
| 김태희 | 댓글 & 별점 |
| 주승준 | 마이페이지 & 찜 |
| 한인웅 | 공통 인프라 & 통합 |

## 브랜치 규칙
- 기능 개발: `feature/기능명` (예: `feature/login`)
- 버그 수정: `bugfix/내용` (예: `bugfix/cors-error`)
- 절대 main에 직접 push 금지 → PR을 통해서만 merge

## 개발 시작하기
1. 이 레포에서 Codespaces 생성 (Code → Codespaces → Create)
2. 작업 브랜치 생성
```bash
   git checkout -b feature/담당기능명
```
3. 개발 후 PR 생성 → CI 통과 → 한인웅 리뷰 → Merge
EOF
