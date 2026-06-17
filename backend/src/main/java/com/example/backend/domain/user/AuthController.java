package com.example.backend.domain.user;

import com.example.backend.common.ApiResponse;
import com.example.backend.domain.user.dto.LoginRequest;
import com.example.backend.domain.user.dto.SignupRequest;
import com.example.backend.domain.user.dto.UserResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final String SESSION_USER_ID = "userId";

    private final AuthService authService;

    @PostMapping("/signup")
    public ApiResponse<UserResponse> signup(@RequestBody SignupRequest request) {
        UserResponse user = authService.signup(request);
        return ApiResponse.success(user);
    }

    @PostMapping("/login")
    public ApiResponse<UserResponse> login(@RequestBody LoginRequest request, HttpSession session) {
        UserResponse user = authService.login(request);
        session.setAttribute(SESSION_USER_ID, user.getUserId());
        return ApiResponse.success(user);
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout(HttpSession session) {
        session.invalidate();
        return ApiResponse.success(null);
    }

    @GetMapping("/me")
    public ApiResponse<UserResponse> me(HttpSession session) {
        String userId = (String) session.getAttribute(SESSION_USER_ID);
        // 인터셉터에서 이미 체크하지만, 타입 안전성을 위해 남겨두거나 명시적 예외를 던집니다.
        if (userId == null) {
            throw new com.example.backend.common.UnauthorizedException("로그인이 필요합니다.");
        }

        return ApiResponse.success(authService.getCurrentUser(userId));
    }
}
