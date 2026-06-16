package com.example.backend.domain.user;

import com.example.backend.common.BaseRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

/**
 * 회원 저장소
 */
@Repository
public class UserRepository extends BaseRepository<User, Long> {

    @PostConstruct
    public void init() {
        save(new User(1L, "admin", "1234", "관리자", "컴퓨터공학"));
        save(new User(2L, "test", "1234", "테스트", "전자공학"));
    }
}
