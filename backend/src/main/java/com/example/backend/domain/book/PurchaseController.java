package com.example.backend.domain.book;

import com.example.backend.common.ApiResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 구매 및 거래 API (담당: 한인웅)
 */
@RestController
@RequiredArgsConstructor
public class PurchaseController {

    private final PurchaseService purchaseService;
    private static final String SESSION_USER_ID = "userId";

    /**
     * 구매 예약
     */
    @PostMapping("/api/books/{id}/reserve")
    public ApiResponse<Void> reserve(@PathVariable Long id, HttpSession session) {
        String userId = (String) session.getAttribute(SESSION_USER_ID);
        purchaseService.reserve(id, userId);
        return ApiResponse.success(null);
    }

    /**
     * 예약 취소
     */
    @DeleteMapping("/api/books/{id}/reserve")
    public ApiResponse<Void> cancelReservation(@PathVariable Long id, HttpSession session) {
        String userId = (String) session.getAttribute(SESSION_USER_ID);
        purchaseService.cancelReservation(id, userId);
        return ApiResponse.success(null);
    }

    /**
     * 거래 완료
     */
    @PostMapping("/api/books/{id}/complete")
    public ApiResponse<Void> completePurchase(@PathVariable Long id, HttpSession session) {
        String userId = (String) session.getAttribute(SESSION_USER_ID);
        purchaseService.completePurchase(id, userId);
        return ApiResponse.success(null);
    }

    /**
     * 내 구매 내역 조회
     */
    @GetMapping("/api/members/me/purchases")
    public ApiResponse<List<Book>> getMyPurchases(HttpSession session) {
        String userId = (String) session.getAttribute(SESSION_USER_ID);
        List<Book> purchases = purchaseService.getMyPurchases(userId);
        return ApiResponse.success(purchases);
    }

    /**
     * 내 예약 내역 조회
     */
    @GetMapping("/api/members/me/reservations")
    public ApiResponse<List<Book>> getMyReservations(HttpSession session) {
        String userId = (String) session.getAttribute(SESSION_USER_ID);
        List<Book> reservations = purchaseService.getMyReservations(userId);
        return ApiResponse.success(reservations);
    }
}
