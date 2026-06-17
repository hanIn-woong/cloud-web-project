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

    @PostMapping
    public ApiResponse<Book> createBook(@RequestBody BookRequest request) {
        return ApiResponse.success(bookService.createBook(request));
    }

    @PutMapping("/{id:\\d+}")
    public ApiResponse<Book> updateBook(@PathVariable Long id, @RequestBody BookRequest request) {
        return ApiResponse.success(bookService.updateBook(id, request));
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
