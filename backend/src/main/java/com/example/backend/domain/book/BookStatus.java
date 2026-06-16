package com.example.backend.domain.book;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 교재 판매 상태
 */
@Getter
@RequiredArgsConstructor
public enum BookStatus {
    SALE("판매중"),
    RESERVED("예약중"),
    SOLD("판매완료");

    private final String description;
}
