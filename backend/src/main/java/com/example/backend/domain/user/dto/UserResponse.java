package com.example.backend.domain.user.dto;

import com.example.backend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String userId;
    private String name;
    private String major;

    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getUserId(), user.getName(), user.getMajor());
    }
}
