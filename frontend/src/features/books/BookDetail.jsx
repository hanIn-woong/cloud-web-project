import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBook } from './bookApi';
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
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let ignore = false;

        const loadBook = async () => {
            setIsLoading(true);
            setErrorMessage('');

            try {
                const result = await getBook(id);

                if (!ignore) {
                    setBook(result);
                }
            } catch (error) {
                if (!ignore) {
                    setBook(null);
                    setErrorMessage(error.message || '교재 상세 정보를 불러오지 못했습니다.');
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        };

        loadBook();

        return () => {
            ignore = true;
        };
    }, [id]);

    if (isLoading) {
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
                        <div>
                            <dt>가격</dt>
                            <dd>{formatPrice(book.price)}</dd>
                        </div>
                    </dl>
                </div>
            </article>

            <section style={{ marginTop: '40px' }}>
                <CommentContainer bookId={parseInt(id)} />
            </section>
        </div>
    );
};

export default BookDetail;
