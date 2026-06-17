import { useEffect, useState, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getBook, reserveBook, cancelReservation, completePurchase } from './bookApi';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import WishButton from './components/WishButton';
import CommentContainer from '../comment/CommentContainer';
import './BookList.css';

const statusLabel = {
    SALE: '판매중',
    RESERVED: '예약중',
    SOLD: '완료',
};

const formatPrice = (price) => {
    if (typeof price !== 'number') {
        return '가격 미정';
    }

    return `${price.toLocaleString('ko-KR')}원`;
};

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { showToast } = useToast();
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const loadBook = useCallback(async () => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const result = await getBook(id);
            setBook(result);
        } catch (error) {
            setBook(null);
            setErrorMessage(error.message || '교재 상세 정보를 불러오지 못했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadBook();
    }, [loadBook]);

    const handleAction = async (actionFn, successMsg, confirmMsg) => {
        if (confirmMsg && !window.confirm(confirmMsg)) return;

        setIsActionLoading(true);
        try {
            await actionFn(id);
            showToast(successMsg, 'success');
            await loadBook(); // 데이터 새로고침
        } catch (error) {
            showToast(error.message || '요청 처리에 실패했습니다.', 'error');
        } finally {
            setIsActionLoading(false);
        }
    };

    if (isLoading && !book) {
        return (
            <div className="book-page">
                <p className="book-page__message">교재 정보를 불러오는 중...</p>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="book-page">
                <p className="book-page__message book-page__message--error">{errorMessage}</p>
                <Link to="/books" className="book-detail__back">목록으로</Link>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="book-page">
                <p className="book-page__message">교재 정보가 없습니다.</p>
                <Link to="/books" className="book-detail__back">목록으로</Link>
            </div>
        );
    }

    const isSeller = isAuthenticated && user?.id === book.sellerId;
    const isBuyer = isAuthenticated && user?.id === book.buyerId;

    return (
        <div className="book-page">
            <Link to="/books" className="book-detail__back">목록으로</Link>

            <article className="book-detail">
                <div className="book-detail__thumb" aria-hidden="true">
                    {book.thumbnailUrl ? (
                        <img src={book.thumbnailUrl} alt="" />
                    ) : (
                        <span>{book.title ?? '교재'}</span>
                    )}
                </div>

                <div className="book-detail__content">
                    <div className="book-detail__top">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <h1>{book.title}</h1>
                            <WishButton bookId={book.id} />
                        </div>
                        <span className={`book-row__status book-row__status--${book.status?.toLowerCase()}`}>
                            {statusLabel[book.status] ?? book.status ?? '상태 미정'}
                        </span>
                    </div>

                    <dl className="book-detail__info">
                        <div>
                            <dt>저자</dt>
                            <dd>{book.author ?? '저자 미상'}</dd>
                        </div>
                        <div>
                            <dt>출판사</dt>
                            <dd>{book.publisher ?? '출판사 미정'}</dd>
                        </div>
                        <div>
                            <dt>책 상태</dt>
                            <dd>{book.condition ?? '상태 미정'}</dd>
                        </div>
                        <div>
                            <dt>판매자</dt>
                            <dd>{book.seller ?? '판매자 미정'}</dd>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <dt>가격</dt>
                            <dd style={{ fontSize: '24px', color: '#004798' }}>{formatPrice(book.price)}</dd>
                        </div>
                    </dl>

                    {/* Transaction Action Buttons */}
                    <div style={styles.actionBar}>
                        {!isAuthenticated && book.status === 'SALE' && (
                            <button 
                                onClick={() => navigate('/login')}
                                style={styles.primaryBtn}
                            >
                                로그인 후 예약하기
                            </button>
                        )}

                        {isAuthenticated && !isSeller && book.status === 'SALE' && (
                            <button 
                                onClick={() => handleAction(reserveBook, '구매 예약이 완료되었습니다.', '이 교재를 예약하시겠습니까?')}
                                disabled={isActionLoading}
                                style={styles.primaryBtn}
                            >
                                {isActionLoading ? '처리 중...' : '구매 예약하기'}
                            </button>
                        )}

                        {isBuyer && book.status === 'RESERVED' && (
                            <button 
                                onClick={() => handleAction(cancelReservation, '예약이 취소되었습니다.', '예약을 취소하시겠습니까?')}
                                disabled={isActionLoading}
                                style={styles.dangerBtn}
                            >
                                {isActionLoading ? '처리 중...' : '예약 취소하기'}
                            </button>
                        )}

                        {isSeller && book.status === 'SALE' && (
                            <Link to={`/books/${id}/edit`} style={styles.secondaryBtn}>
                                교재 정보 수정하기
                            </Link>
                        )}

                        {isSeller && book.status === 'RESERVED' && (
                            <>
                                <button 
                                    onClick={() => handleAction(completePurchase, '거래가 완료되었습니다.', '거래를 완료 처리하시겠습니까?\n완료 후에는 취소할 수 없습니다.')}
                                    disabled={isActionLoading}
                                    style={styles.successBtn}
                                >
                                    {isActionLoading ? '처리 중...' : '거래 완료 (판매확정)'}
                                </button>
                                <button 
                                    onClick={() => handleAction(cancelReservation, '예약이 취소되었습니다.', '예약을 취소하고 다시 판매하시겠습니까?')}
                                    disabled={isActionLoading}
                                    style={styles.dangerBtn}
                                >
                                    {isActionLoading ? '처리 중...' : '예약 취소'}
                                </button>
                            </>
                        )}

                        {book.status === 'SOLD' && (
                            <div style={styles.soldOutBadge}>판매가 완료된 교재입니다.</div>
                        )}
                    </div>
                </div>
            </article>

            <section style={{ marginTop: '40px' }}>
                <CommentContainer bookId={parseInt(id)} />
            </section>
        </div>
    );
};

const styles = {
    actionBar: {
        marginTop: '32px',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
    },
    primaryBtn: {
        padding: '14px 28px',
        backgroundColor: '#004798',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1rem',
        fontWeight: '800',
        cursor: 'pointer',
        flex: 1,
        minWidth: '180px',
    },
    secondaryBtn: {
        padding: '14px 28px',
        backgroundColor: '#fff',
        color: '#004798',
        border: '2px solid #004798',
        borderRadius: '8px',
        fontSize: '1.1rem',
        fontWeight: '800',
        textDecoration: 'none',
        textAlign: 'center',
        flex: 1,
        minWidth: '180px',
    },
    successBtn: {
        padding: '14px 28px',
        backgroundColor: '#16a34a',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1rem',
        fontWeight: '800',
        cursor: 'pointer',
        flex: 2,
        minWidth: '200px',
    },
    dangerBtn: {
        padding: '14px 28px',
        backgroundColor: '#fff',
        color: '#dc2626',
        border: '2px solid #dc2626',
        borderRadius: '8px',
        fontSize: '1.1rem',
        fontWeight: '800',
        cursor: 'pointer',
        flex: 1,
        minWidth: '150px',
    },
    soldOutBadge: {
        padding: '16px',
        backgroundColor: '#f1f5f9',
        color: '#475569',
        borderRadius: '8px',
        fontSize: '1.1rem',
        fontWeight: '800',
        textAlign: 'center',
        width: '100%',
        border: '1px dashed #cbd5e1',
    }
};

export default BookDetail;
