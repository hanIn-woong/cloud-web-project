package com.example.backend.domain.book;

import com.example.backend.domain.book.dto.BookPageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class BookService {

    private static final int DEFAULT_PAGE = 0;
    private static final int DEFAULT_SIZE = 10;
    private static final int MAX_SIZE = 100;

    private final BookRepository bookRepository;

    public BookPageResponse findAllBooks(Integer page, Integer size) {
        return findBooks(null, null, null, null, page, size);
    }

    public BookPageResponse findBooks(
            String keyword,
            String subject,
            String condition,
            String status,
            Integer page,
            Integer size
    ) {
        int safePage = normalizePage(page);
        int safeSize = normalizeSize(size);
        String normalizedKeyword = normalize(keyword).toLowerCase(Locale.ROOT);
        String normalizedCondition = normalize(condition);
        BookStatus normalizedStatus = parseStatus(status);

        List<Book> filteredBooks = bookRepository.findAll().stream()
                .filter(book -> matchesKeyword(book, normalizedKeyword))
                .filter(book -> matchesCondition(book, normalizedCondition))
                .filter(book -> matchesStatus(book, normalizedStatus))
                .sorted(Comparator.comparing(Book::getId))
                .toList();

        long totalElements = filteredBooks.size();
        int totalPages = calculateTotalPages(totalElements, safeSize);

        List<Book> content = filteredBooks.stream()
                .skip((long) safePage * safeSize)
                .limit(safeSize)
                .toList();

        return new BookPageResponse(content, totalPages, totalElements);
    }

    public Book findBook(Long id) {
        validateId(id);
        return bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book not found."));
    }

    private boolean matchesKeyword(Book book, String keyword) {
        if (keyword.isEmpty()) {
            return true;
        }

        return containsIgnoreCase(book.getTitle(), keyword)
                || containsIgnoreCase(book.getAuthor(), keyword)
                || containsIgnoreCase(book.getPublisher(), keyword);
    }

    private boolean matchesCondition(Book book, String condition) {
        if (condition.isEmpty()) {
            return true;
        }
        return containsIgnoreCase(book.getCondition(), condition);
    }

    private boolean matchesStatus(Book book, BookStatus status) {
        return status == null || book.getStatus() == status;
    }

    private BookStatus parseStatus(String status) {
        String normalizedStatus = normalize(status);
        if (normalizedStatus.isEmpty()) {
            return null;
        }

        try {
            return BookStatus.valueOf(normalizedStatus.toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("status는 SALE, RESERVED, SOLD 중 하나여야 합니다.");
        }
    }

    private boolean containsIgnoreCase(String source, String keyword) {
        return normalize(source).toLowerCase(Locale.ROOT).contains(keyword);
    }

    private String normalize(String value) {
        return value == null ? "" : value.trim();
    }

    private int normalizePage(Integer page) {
        if (page == null || page < 0) {
            return DEFAULT_PAGE;
        }
        return page;
    }

    private int normalizeSize(Integer size) {
        if (size == null || size <= 0) {
            return DEFAULT_SIZE;
        }
        return Math.min(size, MAX_SIZE);
    }

    private void validateId(Long id) {
        if (id == null || id < 1) {
            throw new IllegalArgumentException("Book id must be greater than 0.");
        }
    }

    private int calculateTotalPages(long totalElements, int size) {
        if (totalElements == 0) {
            return 0;
        }
        return (int) Math.ceil((double) totalElements / size);
    }
}
