package com.example.backend.common;

/**
 * 모든 도메인 객체의 기본 인터페이스
 * @param <ID> 식별자 타입
 */
public interface BaseEntity<ID> {
    ID getId();
}
