package com.example.backend.domain.user;

import com.example.backend.domain.user.dto.LoginRequest;
import com.example.backend.domain.user.dto.SignupRequest;
import com.example.backend.domain.user.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public UserResponse signup(SignupRequest request) {
        validateSignupRequest(request);

        if (userRepository.findByUserId(request.getUserId()).isPresent()) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }

        Long nextId = userRepository.findAll().stream()
                .mapToLong(User::getId)
                .max()
                .orElse(0L) + 1L;

        User user = new User(
                nextId,
                request.getUserId(),
                request.getPassword(),
                request.getName(),
                request.getMajor()
        );

        userRepository.save(user);
        return UserResponse.from(user);
    }

    public UserResponse login(LoginRequest request) {
        validateLoginRequest(request);

        User user = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다."));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        return UserResponse.from(user);
    }

    public UserResponse getCurrentUser(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return UserResponse.from(user);
    }

    private void validateSignupRequest(SignupRequest request) {
        if (request.getUserId() == null || request.getUserId().isBlank()) {
            throw new IllegalArgumentException("아이디를 입력해 주세요.");
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new IllegalArgumentException("비밀번호를 입력해 주세요.");
        }
        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("이름을 입력해 주세요.");
        }
        if (request.getMajor() == null || request.getMajor().isBlank()) {
            throw new IllegalArgumentException("전공을 입력해 주세요.");
        }
    }

    private void validateLoginRequest(LoginRequest request) {
        if (request.getUserId() == null || request.getUserId().isBlank()) {
            throw new IllegalArgumentException("아이디를 입력해 주세요.");
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new IllegalArgumentException("비밀번호를 입력해 주세요.");
        }
    }
}
