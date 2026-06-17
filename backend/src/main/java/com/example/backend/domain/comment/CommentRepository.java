package com.example.backend.domain.comment;

import com.example.backend.common.BaseRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 댓글 저장소
 */
@Repository
public class CommentRepository extends BaseRepository<Comment, Long> {

    @PostConstruct
    public void init() {
        save(new Comment(1L, 1L, "이영희", "책 상태가 아주 좋아요!", 5, LocalDateTime.now()));
        save(new Comment(2L, 1L, "박민수", "설명이 잘 되어 있네요.", 4, LocalDateTime.now()));
    }

    public List<Comment> findByBookId(Long bookId) {
        return database.stream()
                .filter(comment -> comment.getBookId().equals(bookId))
                .sorted((c1, c2) -> c2.getCreatedAt().compareTo(c1.getCreatedAt()))
                .toList();
    }
}
