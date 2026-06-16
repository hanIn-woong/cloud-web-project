package com.example.backend.common;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * 로그인 여부를 체크하는 인터셉터
 */
@Component
public class LoginInterceptor implements HandlerInterceptor {

    private static final String SESSION_USER_ID = "userId";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // OPTIONS 메서드(CORS preflight)는 통과
        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }

        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute(SESSION_USER_ID) == null) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }

        return true;
    }
}
