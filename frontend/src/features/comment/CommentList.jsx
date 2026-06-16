import React from 'react';
import StarRating from './StarRating';
import { commentApi } from '../../ApiService';

const CommentList = ({ bookId, comments, onCommentDeleted }) => {
  const handleDelete = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      await commentApi.deleteComment(bookId, commentId);
      if (onCommentDeleted) onCommentDeleted();
    } catch (error) {
      alert(error.message || '댓글 삭제에 실패했습니다.');
    }
  };

  if (!comments || comments.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666' }}>등록된 댓글이 없습니다.</p>;
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item" style={{ borderBottom: '1px solid #eee', padding: '1rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: 'bold' }}>{comment.writer}</span>
              <StarRating rating={comment.rating} readonly />
            </div>
            <span style={{ fontSize: '0.85rem', color: '#888' }}>
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{comment.content}</p>
            <button
              onClick={() => handleDelete(comment.id)}
              style={{
                fontSize: '0.8rem',
                color: '#dc3545',
                border: 'none',
                background: 'none',
                cursor: 'pointer'
              }}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
