package com.example.backend.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 관리자 대시보드용 통계 데이터 DTO
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsResponse {
    private long totalUsers;        // 총 사용자 수
    private long totalBooks;        // 등록된 총 도서 수
    private long booksOnSale;       // 판매 중인 도서 수
    private long booksReserved;     // 예약 중인 도서 수
    private long booksSold;         // 판매 완료된 도서 수
}
