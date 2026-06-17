package com.example.backend.domain.book;

import com.example.backend.common.BaseEntity;
<<<<<<< HEAD
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
=======
import lombok.*;
>>>>>>> feature/mypage-wishlist

/**
 * 교재 엔티티
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
<<<<<<< HEAD
=======
@Builder
>>>>>>> feature/mypage-wishlist
public class Book implements BaseEntity<Long> {
    private Long id;
    private String title;      // 교재명
    private String author;     // 저자
    private String publisher;  // 출판사
    private int price;         // 가격
    private String condition;   // 상태 (최상, 상, 중, 하)
    private String seller;      // 판매자명
    private Long sellerId;      // 판매자 회원 번호 (추가)
<<<<<<< HEAD
=======
    @Builder.Default
    private Long createdAt = System.currentTimeMillis(); // 등록 일시
    @Builder.Default
>>>>>>> feature/mypage-wishlist
    private BookStatus status = BookStatus.SALE; // 판매 상태 (SALE, RESERVED, SOLD)
    private Long buyerId;       // 구매자(예약자) 회원 번호

    @Override
    public Long getId() {
        return id;
    }
}
