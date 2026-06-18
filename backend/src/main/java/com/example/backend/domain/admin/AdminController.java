package com.example.backend.domain.admin;

import com.example.backend.common.ApiResponse;
import com.example.backend.domain.admin.dto.AdminStatsResponse;
import com.example.backend.domain.book.Book;
import com.example.backend.domain.user.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 관리자 전용 API 컨트롤러 (Step 2)
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    // --- 통계 ---
    @GetMapping("/stats")
    public ApiResponse<AdminStatsResponse> getStats() {
        return ApiResponse.success(adminService.getStats());
    }

    // --- 사용자 관리 ---
    @GetMapping("/users")
    public ApiResponse<List<UserResponse>> getAllUsers() {
        return ApiResponse.success(adminService.getAllUsers());
    }

    @DeleteMapping("/users/{id}")
    public ApiResponse<Void> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ApiResponse.success(null);
    }

    // --- 도서 관리 ---
    @GetMapping("/books")
    public ApiResponse<List<Book>> getAllBooks() {
        return ApiResponse.success(adminService.getAllBooks());
    }

    @DeleteMapping("/books/{id}")
    public ApiResponse<Void> deleteBook(@PathVariable Long id) {
        adminService.deleteBook(id);
        return ApiResponse.success(null);
    }
}
