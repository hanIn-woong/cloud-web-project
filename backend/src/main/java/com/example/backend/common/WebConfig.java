package com.example.backend.common;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 전역 웹 설정 (CORS 설정 등)
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 모든 경로에 대해 CORS 설정을 적용
        registry.addMapping("/**")
                // 프론트엔드 개발 서버 주소 허용
                .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                // 허용할 HTTP 메서드
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // 자격 증명(쿠키 등) 허용
                .allowCredentials(true)
                // 브라우저가 설정을 캐시할 시간
                .maxAge(3600);
    }
}
