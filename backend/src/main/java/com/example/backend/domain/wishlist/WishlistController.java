package com.example.backend.domain.wishlist;

import com.example.backend.common.ApiResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/wishes")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;
    private static final String SESSION_USER_ID = "userId";

    @PostMapping
    public ApiResponse<Boolean> toggleWish(@RequestBody Map<String, Long> request, HttpSession session) {
        String userId = (String) session.getAttribute(SESSION_USER_ID);
        Long bookId = request.get("bookId");
        
        if (bookId == null) {
            throw new IllegalArgumentException("교재 ID가 필요합니다.");
        }
        
        wishlistService.toggleWish(userId, bookId);
        boolean isWished = wishlistService.isWished(userId, bookId);
        return ApiResponse.success(isWished);
    }
}
