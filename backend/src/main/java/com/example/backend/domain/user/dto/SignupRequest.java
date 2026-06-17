package com.example.backend.domain.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignupRequest {
    private String userId;
    private String password;
    private String name;
    private String major;
}
