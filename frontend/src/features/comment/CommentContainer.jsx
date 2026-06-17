import React, { useState, useEffect, useCallback } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { commentApi } from '../../ApiService';

/**
 * 댓글 및 별점 통합 컨테이너
 * @param {number} bookId 교재 ID
 */
const CommentContainer = ({ bookId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await commentApi.getComments(bookId);
      setComments(data);
    } catch (error) {
      console.error('댓글 조회 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    if (bookId) {
      fetchComments();
    }
  }, [bookId, fetchComments]);

  return (
    <div className="comment-container" style={{ marginTop: '3rem', width: '95%', maxWidth: '1600px', margin: '3rem auto', padding: '0 20px' }}>
      <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        문의 및 후기 ({comments.length})
      </h3>
      
      <CommentForm bookId={bookId} onCommentAdded={fetchComments} />
      
      {isLoading ? (
        <p style={{ textAlign: 'center' }}>로딩 중...</p>
      ) : (
        <CommentList bookId={bookId} comments={comments} onCommentDeleted={fetchComments} />
      )}
    </div>
  );
};

export default CommentContainer;
