import React from 'react';

/**
 * 별점 표시 및 선택 컴포넌트
 * @param {number} rating 현재 별점 (1-5)
 * @param {function} onRatingChange 별점 변경 시 콜백 (선택 모드일 때만 사용)
 * @param {boolean} readonly 읽기 전용 여부
 */
const StarRating = ({ rating, onRatingChange, readonly = false }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''} ${!readonly ? 'clickable' : ''}`}
          onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          style={{
            cursor: readonly ? 'default' : 'pointer',
            fontSize: '1.5rem',
            color: star <= rating ? '#ffc107' : '#e4e5e9',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
