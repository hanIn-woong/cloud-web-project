import React, { useState } from 'react';
import StarRating from './StarRating';
import { commentApi } from '../../ApiService';

const CommentForm = ({ bookId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('댓글 내용을 입력해 주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await commentApi.addComment(bookId, { content, rating });
      setContent('');
      setRating(5);
      if (onCommentAdded) onCommentAdded();
    } catch (error) {
      alert(error.message || '댓글 등록에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>만족도</label>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="책 상태나 거래 후기를 남겨주세요."
          style={{ 
            width: '100%', 
            height: '120px', 
            padding: '0.8rem', 
            borderRadius: '4px', 
            border: '1px solid #ccc',
            resize: 'none',
            overflowY: 'auto',
            boxSizing: 'border-box',
            fontSize: '1rem'
          }}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? '등록 중...' : '댓글 등록'}
      </button>
    </form>
  );
};

export default CommentForm;
