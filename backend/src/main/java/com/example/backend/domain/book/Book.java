package com.example.backend.domain.book;

import com.example.backend.common.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 교재 엔티티
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Book implements BaseEntity<Long> {
    private Long id;
    private String title;      // 교재명
    private String author;     // 저자
    private String publisher;  // 출판사
    private int price;         // 가격
    private String condition;   // 상태 (최상, 상, 중, 하)
    private String seller;      // 판매자명

    @Override
    public Long getId() {
        return id;
    }
}
