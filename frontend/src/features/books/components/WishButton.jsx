import { useState, useEffect } from 'react';
import { wishApi } from '../../../ApiService';
import { useToast } from '../../../context/ToastContext';
import { useAuth } from '../../../context/AuthContext';

const WishButton = ({ bookId }) => {
    const { showToast } = useToast();
    const { user, isWished, toggleWishLocal } = useAuth();
    
    const active = isWished(bookId);

    const handleToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            showToast('로그인이 필요한 기능입니다.', 'error');
            return;
        }

        // Optimistic UI update
        const previousState = active;
        toggleWishLocal(bookId, !previousState);

        try {
            const result = await wishApi.toggleWish(bookId);
            toggleWishLocal(bookId, result); // result is the new isWished state from server
            if (result) {
                showToast('찜 목록에 추가되었습니다.', 'success');
            } else {
                showToast('찜 목록에서 제거되었습니다.', 'success');
            }
        } catch (error) {
            // Rollback on error
            toggleWishLocal(bookId, previousState);
            showToast(error.message || '찜하기 처리에 실패했습니다.', 'error');
        }
    };

    return (
        <button
            onClick={handleToggle}
            className={`wish-button ${active ? 'wish-button--active' : ''}`}
            aria-label={active ? '찜 취소' : '찜하기'}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.5rem',
                color: active ? '#ff4d4f' : '#ccc',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s, transform 0.1s',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.9)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
            {active ? '❤️' : '🤍'}
        </button>
    );
};

export default WishButton;
