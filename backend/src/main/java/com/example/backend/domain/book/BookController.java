package com.example.backend.domain.book;

import com.example.backend.common.ApiResponse;
import com.example.backend.domain.book.dto.BookPageResponse;
import com.example.backend.domain.book.dto.BookRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping
    public ApiResponse<BookPageResponse> getBooks(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size
    ) {
        return ApiResponse.success(bookService.findAllBooks(page, size));
    }

    @GetMapping("/search")
    public ApiResponse<BookPageResponse> searchBooks(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String condition,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size
    ) {
        return ApiResponse.success(bookService.findBooks(keyword, condition, status, page, size));
    }

    @GetMapping("/{id:\\d+}")
    public ApiResponse<Book> getBook(@PathVariable Long id) {
        return ApiResponse.success(bookService.findBook(id));
    }

    private final com.example.backend.domain.user.UserRepository userRepository;
    private static final String SESSION_USER_ID = "userId";

    @PostMapping
    public ApiResponse<Book> createBook(@RequestBody BookRequest request, jakarta.servlet.http.HttpSession session) {
        String loginId = (String) session.getAttribute(SESSION_USER_ID);
        com.example.backend.domain.user.User user = userRepository.findByUserId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보를 찾을 수 없습니다."));
        
        return ApiResponse.success(bookService.createBook(request, user.getId()));
    }

    @PutMapping("/{id:\\d+}")
    public ApiResponse<Book> updateBook(@PathVariable Long id, @RequestBody BookRequest request, jakarta.servlet.http.HttpSession session) {
        String loginId = (String) session.getAttribute(SESSION_USER_ID);
        com.example.backend.domain.user.User user = userRepository.findByUserId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보를 찾을 수 없습니다."));

        return ApiResponse.success(bookService.updateBook(id, request, user.getId()));
    }

    @DeleteMapping("/{id:\\d+}")
    public ApiResponse<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ApiResponse.success(null, "교재가 삭제되었습니다.");
    }

    private String firstNonBlank(String first, String second) {
        if (first != null && !first.trim().isEmpty()) {
            return first;
        }
        if (second != null && !second.trim().isEmpty()) {
            return second;
        }
        return null;
    }
}
