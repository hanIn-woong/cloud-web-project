package com.example.backend.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * ArrayList 기반의 공통 저장소 추상 클래스
 * @param <T> 엔티티 타입
 * @param <ID> 엔티티의 식별자 타입
 */
public abstract class BaseRepository<T extends BaseEntity<ID>, ID> {
    
    // 실제 데이터가 저장되는 리스트 (메모리 DB)
    protected final List<T> database = new ArrayList<>();

    /**
     * 전체 목록 조회
     */
    public List<T> findAll() {
        return new ArrayList<>(database);
    }

    /**
     * ID로 단건 조회
     */
    public Optional<T> findById(ID id) {
        return database.stream()
                .filter(entity -> entity.getId().equals(id))
                .findFirst();
    }

    /**
     * 저장 (추가 또는 수정)
     */
    public T save(T entity) {
        // 이미 해당 ID가 존재하면 기존 데이터를 삭제 (수정 처리를 위함)
        findById(entity.getId()).ifPresent(database::remove);
        database.add(entity);
        return entity;
    }

    /**
     * ID로 삭제
     */
    public void deleteById(ID id) {
        findById(id).ifPresent(database::remove);
    }

    /**
     * 전체 삭제 (테스트용 등)
     */
    public void deleteAll() {
        database.clear();
    }
}
