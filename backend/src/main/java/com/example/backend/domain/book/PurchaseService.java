package com.example.backend.domain.book;

import com.example.backend.domain.user.User;
import com.example.backend.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 구매 및 거래 비즈니스 로직 (담당: 한인웅)
 */
@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    /**
     * 구매 예약
     */
    public void reserve(Long bookId, String sessionUserId) {
        Book book = findBookById(bookId);
        User user = findUserBySessionId(sessionUserId);

        if (book.getStatus() != BookStatus.SALE) {
            throw new IllegalArgumentException("이미 예약되거나 판매 완료된 교재입니다.");
        }
        if (book.getSellerId().equals(user.getId())) {
            throw new IllegalArgumentException("본인이 등록한 교재는 예약할 수 없습니다.");
        }

        book.setStatus(BookStatus.RESERVED);
        book.setBuyerId(user.getId());
        bookRepository.save(book);
    }

    /**
<<<<<<< HEAD
     * 예약 취소 (판매자 또는 구매 희망자 권한)
=======
     * 예약 취소 (판매자 권한)
>>>>>>> feature/mypage-wishlist
     */
    public void cancelReservation(Long bookId, String sessionUserId) {
        Book book = findBookById(bookId);
        User user = findUserBySessionId(sessionUserId);

        if (book.getStatus() != BookStatus.RESERVED) {
            throw new IllegalArgumentException("예약 상태가 아닌 교재입니다.");
        }
<<<<<<< HEAD

        boolean isSeller = book.getSellerId().equals(user.getId());
        boolean isBuyer = user.getId().equals(book.getBuyerId());

        if (!isSeller && !isBuyer) {
            throw new IllegalArgumentException("예약을 취소할 권한이 없습니다.");
=======
        if (!book.getSellerId().equals(user.getId())) {
            throw new IllegalArgumentException("판매자만 예약을 취소할 수 있습니다.");
>>>>>>> feature/mypage-wishlist
        }

        book.setStatus(BookStatus.SALE);
        book.setBuyerId(null);
        bookRepository.save(book);
    }

    /**
     * 거래 완료 (판매자 권한)
     */
    public void completePurchase(Long bookId, String sessionUserId) {
        Book book = findBookById(bookId);
        User user = findUserBySessionId(sessionUserId);

        if (book.getStatus() != BookStatus.RESERVED) {
            throw new IllegalArgumentException("예약 상태인 교재만 거래 완료 처리할 수 있습니다.");
        }
        if (!book.getSellerId().equals(user.getId())) {
            throw new IllegalArgumentException("판매자만 거래 완료 처리할 수 있습니다.");
        }

        book.setStatus(BookStatus.SOLD);
        bookRepository.save(book);
    }

    /**
     * 내 구매 내역 조회
     */
    public List<Book> getMyPurchases(String sessionUserId) {
        User user = findUserBySessionId(sessionUserId);
        return bookRepository.findAll().stream()
                .filter(book -> user.getId().equals(book.getBuyerId()) && book.getStatus() == BookStatus.SOLD)
                .collect(Collectors.toList());
    }

    private Book findBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 교재입니다."));
    }

    private User findUserBySessionId(String sessionUserId) {
        return userRepository.findByUserId(sessionUserId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }
}
