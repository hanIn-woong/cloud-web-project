package com.example.backend.domain.book;

import com.example.backend.common.ApiResponse;
import com.example.backend.domain.book.dto.BookRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping({"", "/search"})
    public ApiResponse<List<Book>> getBooks(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String condition,
            @RequestParam(required = false) String seller
    ) {
        String effectiveKeyword = firstNonBlank(keyword, query);
        return ApiResponse.success(bookService.findBooks(effectiveKeyword, condition, seller));
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
