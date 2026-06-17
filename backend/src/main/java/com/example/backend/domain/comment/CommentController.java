package com.example.backend.domain.comment;

import com.example.backend.common.ApiResponse;
import com.example.backend.domain.comment.dto.CommentRequest;
import com.example.backend.domain.comment.dto.CommentResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books/{bookId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private static final String SESSION_USER_ID = "userId";

    @GetMapping
    public ApiResponse<List<CommentResponse>> getComments(@PathVariable Long bookId) {
        return ApiResponse.success(commentService.getCommentsByBookId(bookId));
    }

    @PostMapping
    public ApiResponse<CommentResponse> addComment(
            @PathVariable Long bookId,
            @RequestBody CommentRequest request,
            HttpSession session) {
        
        String userId = (String) session.getAttribute(SESSION_USER_ID);
        if (userId == null) {
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return ApiResponse.success(commentService.addComment(bookId, userId, request));
    }

    @DeleteMapping("/{commentId}")
    public ApiResponse<Void> deleteComment(
            @PathVariable Long bookId,
            @PathVariable Long commentId,
            HttpSession session) {

        String userId = (String) session.getAttribute(SESSION_USER_ID);
        if (userId == null) {
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        commentService.deleteComment(commentId, userId);
        return ApiResponse.success(null);
    }
}
