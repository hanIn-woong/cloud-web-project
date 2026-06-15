# 📚 3팀 프로젝트 공통 인프라 사용 가이드

본 가이드는 **공통 인프라 및 통합** 담당자가 구축한 초기 환경을 팀원들이 올바르게 활용하기 위해 작성되었습니다. 모든 기능 구현 시 아래 규칙을 준수해 주세요.

---

## 🛠️ 백엔드 (Spring Boot)

### 1. 공통 응답 포맷 (`ApiResponse`)
모든 Controller는 직접 객체를 반환하지 않고 `ApiResponse`로 감싸서 반환합니다.
- **성공 시:** `ApiResponse.success(T data)`
- **에러 시:** `ApiResponse.error(String message)`

```java
@GetMapping("/{id}")
public ApiResponse<Book> getBook(@PathVariable Long id) {
    Book book = bookService.findById(id);
    return ApiResponse.success(book);
}
```

### 2. 메모리 저장소 활용 (`BaseRepository`)
데이터베이스 대신 `ArrayList`를 사용합니다. 각 담당 도메인은 `com.example.backend.domain` 패키지 하위의 본인 폴더를 사용하세요.

**도메인별 폴더 위치:**
- **회원 & 인증:** `domain.user` (조건희)
- **교재 목록 & 등록:** `domain.book` (정민성, 김민호)
- **댓글 & 별점:** `domain.comment` (김태희)
- **마이페이지 & 찜:** `domain.wishlist` (주승준)

**Repository 사용법:**
모든 Repository는 `BaseRepository<Entity, ID>`를 상속받아 구현되어 있습니다.
```java
@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
}
```

### 3. 예외 처리
비즈니스 로직 중 오류 발생 시 `IllegalArgumentException`을 던지면 자동으로 `ApiResponse` 포맷(400 Bad Request)으로 변환되어 클라이언트에 전달됩니다. 별도의 `try-catch`는 지양해 주세요.

---

## ⚛️ 프론트엔드 (React)

### 1. API 호출 (`ApiService.js`)
Axios 인스턴스가 설정되어 있습니다. `ApiService`를 임포트하여 사용하면 백엔드 응답의 `data` 부분만 깔끔하게 받아올 수 있습니다.

```javascript
import api from './ApiService';

const fetchBooks = async () => {
    try {
        const books = await api.get('/books'); // success: true 체크 로직이 내장됨
        setBooks(books);
    } catch (error) {
        showToast(error.message, 'error');
    }
};
```

### 2. 알림 및 로딩 (`useToast`)
등록 완료, 에러 발생 시 사용자에게 알림을 주거나 API 호출 중 로딩 화면을 보여줄 때 사용합니다.

```javascript
import { useToast } from './context/ToastContext';

const MyComponent = () => {
    const { showToast, setIsLoading } = useToast();

    const handleSave = async () => {
        setIsLoading(true); // 로딩 시작
        try {
            await api.post('/books', data);
            showToast('성공적으로 저장되었습니다!', 'success');
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };
};
```

### 3. 페이지 추가 및 라우팅 (`App.jsx`)
새로운 페이지를 만들면 `App.jsx`의 `<Routes>` 내부에 추가하세요.
- 로그인 없이 접근 가능: `<Route path="/path" element={<MyPage />} />`
- **로그인 필수 페이지:** `<PrivateRoute>`로 감싸기
- **공통 레이아웃:** `Header.jsx`와 `Footer.jsx`가 모든 페이지에 적용되어 있습니다.

---

## 🚀 로컬 개발 환경
- **백엔드:** `http://localhost:8080` (CORS 설정 완료)
- **프론트:** `http://localhost:5173` (Vite 기본 포트)

