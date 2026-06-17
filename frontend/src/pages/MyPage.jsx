import { useEffect, useState } from 'react';
import { memberApi } from '../ApiService';
import { getMyPurchases } from '../features/books/bookApi';
import { useAuth } from '../context/AuthContext';
import BookTableRow from '../features/books/components/BookTableRow';
import '../features/books/BookList.css';

const MyPage = () => {
    const { user } = useAuth();
    const [myBooks, setMyBooks] = useState([]);
    const [purchasedBooks, setPurchasedBooks] = useState([]);
    const [activeTab, setActiveTab] = useState('selling'); // 'selling' or 'purchased'
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!user) return;

        const loadData = async () => {
            setIsLoading(true);
            setErrorMessage('');
            try {
                if (activeTab === 'selling') {
                    const data = await memberApi.getMyBooks(user.id);
                    setMyBooks(data);
                } else {
                    const data = await getMyPurchases();
                    setPurchasedBooks(data);
                }
            } catch (error) {
                setErrorMessage(error.message || '데이터를 불러오지 못했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [user, activeTab]);

    if (!user) {
        return <div className="book-page"><p className="book-page__message">로그인이 필요합니다.</p></div>;
    }

    const currentBooks = activeTab === 'selling' ? myBooks : purchasedBooks;

    return (
        <div className="book-page">
            <header className="book-page__header" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '2.2rem', color: '#111827', margin: 0 }}>마이페이지</h1>
                <p style={{ fontSize: '1.1rem', color: '#64748b', margin: 0 }}>{user.name}님의 활동 내역입니다.</p>
            </header>

            {/* Tab Navigation */}
            <div style={styles.tabContainer}>
                <button 
                    style={{...styles.tabButton, ...(activeTab === 'selling' ? styles.activeTab : {})}}
                    onClick={() => setActiveTab('selling')}
                >
                    내가 등록한 교재
                </button>
                <button 
                    style={{...styles.tabButton, ...(activeTab === 'purchased' ? styles.activeTab : {})}}
                    onClick={() => setActiveTab('purchased')}
                >
                    내 구매 내역
                </button>
            </div>

            <div className="book-page__summary" style={{ paddingTop: '24px', marginBottom: '20px' }}>
                <span>총 {currentBooks.length}권</span>
            </div>

            {isLoading && <p className="book-page__message">불러오는 중...</p>}
            {errorMessage && <p className="book-page__message book-page__message--error">{errorMessage}</p>}
            {!isLoading && !errorMessage && currentBooks.length === 0 && (
                <p className="book-page__message">
                    {activeTab === 'selling' ? '등록한 교재가 없습니다.' : '구매 내역이 없습니다.'}
                </p>
            )}

            <div className="book-list">
                {currentBooks.map((book) => (
                    <BookTableRow key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

const styles = {
    tabContainer: {
        display: 'flex',
        gap: '2px',
        borderBottom: '2px solid #f1f5f9',
        marginBottom: '10px',
    },
    tabButton: {
        padding: '12px 24px',
        fontSize: '1rem',
        fontWeight: '600',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '3px solid transparent',
        cursor: 'pointer',
        color: '#64748b',
        transition: 'all 0.2s ease',
    },
    activeTab: {
        color: '#004798',
        borderBottomColor: '#004798',
    }
};

export default MyPage;
