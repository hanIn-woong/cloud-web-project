package com.example.backend.domain.comment;

import com.example.backend.domain.comment.dto.CommentRequest;
import com.example.backend.domain.comment.dto.CommentResponse;
import com.example.backend.domain.user.User;
import com.example.backend.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public List<CommentResponse> getCommentsByBookId(Long bookId) {
        return commentRepository.findByBookId(bookId).stream()
                .map(CommentResponse::from)
                .toList();
    }

    public CommentResponse addComment(Long bookId, String userId, CommentRequest request) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Long nextId = commentRepository.findAll().stream()
                .mapToLong(Comment::getId)
                .max()
                .orElse(0L) + 1L;

        Comment comment = new Comment(
                nextId,
                bookId,
                user.getName(),
                request.getContent(),
                request.getRating(),
                LocalDateTime.now()
        );

        commentRepository.save(comment);
        return CommentResponse.from(comment);
    }

    public void deleteComment(Long commentId, String userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다."));

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 작성자 본인만 삭제 가능 (단순 이름을 비교하거나 유저 엔티티를 더 활용할 수 있음)
        if (!comment.getWriter().equals(user.getName())) {
            throw new IllegalArgumentException("본인이 작성한 댓글만 삭제할 수 있습니다.");
        }

        commentRepository.deleteById(commentId);
    }
}
