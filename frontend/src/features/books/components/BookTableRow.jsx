import { Link } from 'react-router-dom';

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

const formatDate = (createdAt) => {
    if (!createdAt) {
        return '등록일 미정';
    }

    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(createdAt));
};

const BookTableRow = ({ book }) => {
    const status = statusLabel[book.status] ?? book.status ?? '상태 미정';
    const condition = book.condition ? `상태 ${book.condition}` : '상태 미정';

    return (
        <article className="book-row">
            <div className="book-row__thumb" aria-hidden="true">
                {book.thumbnailUrl ? (
                    <img src={book.thumbnailUrl} alt="" />
                ) : (
                    <span>{book.title ?? '교재'}</span>
                )}
            </div>

            <div className="book-row__content">
                <div className="book-row__top">
                    <h2>{book.title}</h2>
                    <span className={`book-row__status book-row__status--${book.status?.toLowerCase()}`}>
                        {status}
                    </span>
                </div>
                <p className="book-row__meta">
                    {book.author ?? '저자 미상'} · {book.publisher ?? '출판사 미정'} · {condition}
                </p>
                <p className="book-row__seller">
                    판매자: {book.seller ?? '판매자 미정'}
                </p>
                <div className="book-row__bottom">
                    <strong>{formatPrice(book.price)}</strong>
                    <span>{formatDate(book.createdAt)}</span>
                </div>
            </div>

            <Link to={`/books/${book.id}`} className="book-row__detail">
                상세보기
            </Link>
        </article>
    );
};

export default BookTableRow;
