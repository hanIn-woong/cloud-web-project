package com.example.backend.domain.comment;

import com.example.backend.common.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

/**
 * 댓글 및 별점 엔티티 (담당: 김태희)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment implements BaseEntity<Long> {
    private Long id;
    private Long bookId;      // 대상 교재 ID
    private String writer;    // 작성자 이름
    private String content;   // 내용
    private int rating;       // 별점 (1-5)
    private LocalDateTime createdAt;

    @Override
    public Long getId() {
        return id;
    }
}
