package com.example.backend.common;

/**
 * 인증되지 않은 사용자가 보호된 리소스에 접근할 때 발생하는 예외
 */
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}
