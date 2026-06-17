package com.example.backend.domain.book.dto;

/**
 * 교재 등록 및 수정 요청 본문.
 */
public record BookRequest(
        String title,
        String author,
        String publisher,
        Integer price,
        String condition,
        String seller
) {
}
