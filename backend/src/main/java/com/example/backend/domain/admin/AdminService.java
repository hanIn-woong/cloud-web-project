package com.example.backend.domain.admin;

import com.example.backend.domain.admin.dto.AdminStatsResponse;
import com.example.backend.domain.book.Book;
import com.example.backend.domain.book.BookRepository;
import com.example.backend.domain.book.BookStatus;
import com.example.backend.domain.user.User;
import com.example.backend.domain.user.UserRepository;
import com.example.backend.domain.user.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 관리자 기능 서비스 (Step 2)
 */
@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    // --- 사용자 관리 ---

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserResponse::from)
                .collect(Collectors.toList());
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        
        if (user.isAdmin()) {
            throw new IllegalArgumentException("관리자 계정은 삭제할 수 없습니다.");
        }
        
        userRepository.deleteById(id);
    }

    // --- 도서 관리 ---

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public void deleteBook(Long id) {
        if (bookRepository.findById(id).isEmpty()) {
            throw new IllegalArgumentException("존재하지 않는 도서입니다.");
        }
        bookRepository.deleteById(id);
    }

    // --- 통계 ---

    public AdminStatsResponse getStats() {
        List<User> users = userRepository.findAll();
        List<Book> books = bookRepository.findAll();

        long totalUsers = users.size();
        long totalBooks = books.size();
        long booksOnSale = books.stream().filter(b -> b.getStatus() == BookStatus.SALE).count();
        long booksReserved = books.stream().filter(b -> b.getStatus() == BookStatus.RESERVED).count();
        long booksSold = books.stream().filter(b -> b.getStatus() == BookStatus.SOLD).count();

        return new AdminStatsResponse(totalUsers, totalBooks, booksOnSale, booksReserved, booksSold);
    }
}
