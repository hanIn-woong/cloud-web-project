package com.example.backend.domain.book;

import com.example.backend.domain.book.dto.BookRequest;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Locale;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> findBooks(String keyword, String condition, String seller) {
        String normalizedKeyword = normalize(keyword);
        String normalizedCondition = normalize(condition);
        String normalizedSeller = normalize(seller);

        return bookRepository.findAll().stream()
                .filter(book -> matchesKeyword(book, normalizedKeyword))
                .filter(book -> matchesField(book.getCondition(), normalizedCondition))
                .filter(book -> matchesField(book.getSeller(), normalizedSeller))
                .sorted(Comparator.comparing(Book::getId))
                .toList();
    }

    public Book findBook(Long id) {
        validateId(id);
        return bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 교재입니다."));
    }

    public Book createBook(BookRequest request) {
        validateRequest(request);

        Book book = new Book(
                nextId(),
                normalize(request.title()),
                normalize(request.author()),
                normalize(request.publisher()),
                request.price(),
                normalize(request.condition()),
                normalize(request.seller())
        );

        return bookRepository.save(book);
    }

    public Book updateBook(Long id, BookRequest request) {
        validateId(id);
        findBook(id);
        validateRequest(request);

        Book updated = new Book(
                id,
                normalize(request.title()),
                normalize(request.author()),
                normalize(request.publisher()),
                request.price(),
                normalize(request.condition()),
                normalize(request.seller())
        );

        return bookRepository.save(updated);
    }

    public void deleteBook(Long id) {
        validateId(id);
        findBook(id);
        bookRepository.deleteById(id);
    }

    private Long nextId() {
        return bookRepository.findAll().stream()
                .mapToLong(Book::getId)
                .max()
                .orElse(0L) + 1L;
    }

    private void validateRequest(BookRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("요청 본문이 필요합니다.");
        }
        validateText(request.title(), "교재명");
        validateText(request.author(), "저자");
        validateText(request.publisher(), "출판사");
        validateText(request.condition(), "상태");
        validateText(request.seller(), "판매자");

        if (request.price() == null || request.price() < 0) {
            throw new IllegalArgumentException("가격은 0 이상이어야 합니다.");
        }
    }

    private void validateId(Long id) {
        if (id == null || id < 1) {
            throw new IllegalArgumentException("교재 ID는 1 이상이어야 합니다.");
        }
    }

    private void validateText(String value, String fieldName) {
        if (normalize(value).isEmpty()) {
            throw new IllegalArgumentException(fieldName + "은(는) 필수입니다.");
        }
    }

    private boolean matchesKeyword(Book book, String keyword) {
        if (keyword.isEmpty()) {
            return true;
        }

        return containsIgnoreCase(book.getTitle(), keyword)
                || containsIgnoreCase(book.getAuthor(), keyword)
                || containsIgnoreCase(book.getPublisher(), keyword)
                || containsIgnoreCase(book.getCondition(), keyword)
                || containsIgnoreCase(book.getSeller(), keyword)
                || containsIgnoreCase(String.valueOf(book.getId()), keyword);
    }

    private boolean matchesField(String source, String expected) {
        if (expected.isEmpty()) {
            return true;
        }
        return containsIgnoreCase(source, expected);
    }

    private boolean containsIgnoreCase(String source, String expected) {
        return normalize(source).toLowerCase(Locale.ROOT)
                .contains(normalize(expected).toLowerCase(Locale.ROOT));
    }

    private String normalize(String value) {
        return value == null ? "" : value.trim();
    }
}
