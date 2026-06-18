package com.example.backend.domain.user;

import com.example.backend.common.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 회원 엔티티 (담당: 조건희)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements BaseEntity<Long> {
    private Long id;
    private String userId;   // 로그인 ID
    private String password; // 비밀번호
    private String name;     // 이름
    private String major;    // 전공
    private boolean isAdmin = false; // 관리자 여부

    public User(Long id, String userId, String password, String name, String major) {
        this.id = id;
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.major = major;
        this.isAdmin = false;
    }

    @Override
    public Long getId() {
        return id;
    }
}
