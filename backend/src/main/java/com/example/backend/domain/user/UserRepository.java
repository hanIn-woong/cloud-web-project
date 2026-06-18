package com.example.backend.domain.user;

import com.example.backend.common.BaseRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 회원 저장소
 */
@Repository
public class UserRepository extends BaseRepository<User, Long> {

    @PostConstruct
    public void init() {
        // BookRepository의 샘플 데이터(sellerId)에 맞춘 회원 정보
        // userId를 학번 형태(2026XXXXX)로 수정
        save(new User(1L, "202600001", "1234", "김철수", "컴퓨터공학"));
        save(new User(2L, "202600002", "1234", "이영희", "소프트웨어"));
        save(new User(3L, "202600003", "1234", "박민수", "정보통신"));
        save(new User(4L, "202600004", "1234", "최지우", "데이터사이언스"));
        save(new User(5L, "202600005", "1234", "정다은", "인공지능"));
        save(new User(6L, "202600006", "1234", "한인웅", "컴퓨터공학"));
        save(new User(7L, "202600007", "1234", "조현우", "전자공학"));
        save(new User(8L, "202600008", "1234", "강하늘", "산업디자인"));
        save(new User(9L, "202600009", "1234", "윤서연", "경영학과"));
        save(new User(10L, "202600010", "1234", "임재범", "멀티미디어"));
        save(new User(11L, "202600011", "1234", "김태희", "정보통신"));
        
        // admin 계정 (외부 관리자 설정)
        User admin = new User(99L, "admin", "admin123", "시스템관리자", "운영팀");
        admin.setAdmin(true);
        save(admin);
    }

    public Optional<User> findByUserId(String userId) {
        return database.stream()
                .filter(user -> user.getUserId().equals(userId))
                .findFirst();
    }
}
