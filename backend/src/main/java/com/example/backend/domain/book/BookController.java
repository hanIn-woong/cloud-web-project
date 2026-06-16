package com.example.backend.domain.book;

import com.example.backend.common.ApiResponse;
import com.example.backend.domain.book.dto.BookPageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
