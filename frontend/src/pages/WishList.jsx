import { useEffect, useState } from 'react';
import { memberApi } from '../ApiService';
import { useAuth } from '../context/AuthContext';
import BookTableRow from '../features/books/components/BookTableRow';
import '../features/books/BookList.css';

const WishList = () => {
    const { user } = useAuth();
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!user) return;

        const loadWishes = async () => {
            setIsLoading(true);
            try {
                const data = await memberApi.getMyWishes(user.id);
                setBooks(data);
            } catch (error) {
                setErrorMessage(error.message || '찜 목록을 불러오지 못했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        loadWishes();
    }, [user]);

    if (!user) {
        return <div className="book-page"><p className="book-page__message">로그인이 필요합니다.</p></div>;
    }

    return (
        <div className="book-page">
            <header className="book-page__header" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.2rem', color: '#111827', margin: 0 }}>찜 목록</h1>
                <p style={{ fontSize: '1.1rem', color: '#64748b', margin: 0 }}>{user.name}님이 관심을 표시한 교재들입니다.</p>
            </header>

            <div className="book-page__summary" style={{ borderTop: '2px solid #f1f5f9', paddingTop: '24px', marginBottom: '20px' }}>
                <span>총 {books.length}권</span>
            </div>

            {isLoading && <p className="book-page__message">불러오는 중...</p>}
            {errorMessage && <p className="book-page__message book-page__message--error">{errorMessage}</p>}
            {!isLoading && !errorMessage && books.length === 0 && (
                <p className="book-page__message">찜한 교재가 없습니다.</p>
            )}

            <div className="book-list">
                {books.map((book) => (
                    <BookTableRow key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default WishList;
