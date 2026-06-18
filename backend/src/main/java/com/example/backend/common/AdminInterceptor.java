package com.example.backend.common;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * 관리자 권한 여부를 체크하는 인터셉터
 */
@Component
public class AdminInterceptor implements HandlerInterceptor {

    private static final String SESSION_IS_ADMIN = "isAdmin";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // OPTIONS 메서드(CORS preflight)는 통과
        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }

        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute(SESSION_IS_ADMIN) == null || !(boolean) session.getAttribute(SESSION_IS_ADMIN)) {
            throw new ForbiddenException("관리자 권한이 필요합니다.");
        }

        return true;
    }
}
