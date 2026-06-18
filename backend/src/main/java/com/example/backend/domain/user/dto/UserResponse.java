package com.example.backend.domain.user.dto;

import com.example.backend.domain.user.User;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    
    @JsonProperty("isAdmin")
    private boolean isAdmin;

    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getUserId(),
                user.getName(),
                user.getMajor(),
                user.isAdmin()
        );
    }
}
