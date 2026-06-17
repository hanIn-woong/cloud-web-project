import { useEffect, useState } from 'react';
import { memberApi } from '../ApiService';
import { getMyPurchases, cancelReservation, getMyReservations } from '../features/books/bookApi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import BookTableRow from '../features/books/components/BookTableRow';
import '../features/books/BookList.css';

const MyPage = () => {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [myBooks, setMyBooks] = useState([]);
    const [purchasedBooks, setPurchasedBooks] = useState([]);
    const [reservedBooks, setReservedBooks] = useState([]);
    const [activeTab, setActiveTab] = useState('selling'); // 'selling', 'reserved', or 'purchased'
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const loadData = async () => {
        if (!user) return;
        setIsLoading(true);
        setErrorMessage('');
        try {
            if (activeTab === 'selling') {
                const data = await memberApi.getMyBooks(user.id);
                setMyBooks(data);
            } else if (activeTab === 'reserved') {
                const data = await getMyReservations();
                setReservedBooks(data);
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

    // 통계를 위해 데이터 로드
    useEffect(() => {
        const loadInitialStats = async () => {
            if (!user) return;
            try {
                const [selling, purchased, reserved] = await Promise.all([
                    memberApi.getMyBooks(user.id),
                    getMyPurchases(),
                    getMyReservations()
                ]);
                setMyBooks(selling);
                setPurchasedBooks(purchased);
                setReservedBooks(reserved);
            } catch (error) {
                console.error('Failed to load initial data', error);
            }
        };
        loadInitialStats();
    }, [user]);

    useEffect(() => {
        loadData();
    }, [user, activeTab]);

    const handleCancelReservation = async (bookId) => {
        if (!window.confirm('예약을 취소하시겠습니까?')) return;

        try {
            await cancelReservation(bookId);
            showToast('예약이 취소되었습니다.', 'success');
            loadData(); // 목록 새로고침
        } catch (error) {
            showToast(error.message || '예약 취소에 실패했습니다.', 'error');
        }
    };

    if (!user) {
        return <div className="book-page"><p className="book-page__message">로그인이 필요합니다.</p></div>;
    }

    const currentBooks = activeTab === 'selling' ? myBooks : activeTab === 'reserved' ? reservedBooks : purchasedBooks;

    return (
        <div className="book-page">
            <header className="book-page__header">
                <h1 style={{ fontSize: '2.2rem', color: '#111827', marginBottom: '24px' }}>마이페이지</h1>
                
                {/* User Profile Summary */}
                <div style={styles.profileCard}>
                    <div style={styles.profileAvatar}>
                        {user.name.charAt(0)}
                    </div>
                    <div style={styles.profileInfo}>
                        <h2 style={styles.profileName}>{user.name} <span style={styles.profileMajor}>{user.major}</span></h2>
                        <p style={styles.profileId}>{user.userId}</p>
                    </div>
                    <div style={styles.profileStats}>
                        <div style={styles.statItem}>
                            <span style={styles.statLabel}>등록 교재</span>
                            <span style={styles.statValue}>{myBooks.length}</span>
                        </div>
                        <div style={styles.statDivider} />
                        <div style={styles.statItem}>
                            <span style={styles.statLabel}>예약 중</span>
                            <span style={styles.statValue}>{reservedBooks.length}</span>
                        </div>
                        <div style={styles.statDivider} />
                        <div style={styles.statItem}>
                            <span style={styles.statLabel}>구매 완료</span>
                            <span style={styles.statValue}>{purchasedBooks.length}</span>
                        </div>
                    </div>
                </div>
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
                    style={{...styles.tabButton, ...(activeTab === 'reserved' ? styles.activeTab : {})}}
                    onClick={() => setActiveTab('reserved')}
                >
                    예약한 교재
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
                    {activeTab === 'selling' ? '등록한 교재가 없습니다.' : activeTab === 'reserved' ? '예약 중인 교재가 없습니다.' : '구매 내역이 없습니다.'}
                </p>
            )}

            <div className="book-list">
                {currentBooks.map((book) => (
                    <div key={book.id} style={styles.bookItemContainer}>
                        <BookTableRow book={book} />
                        {book.status === 'RESERVED' && (
                            <div style={styles.actionArea}>
                                <button 
                                    onClick={() => handleCancelReservation(book.id)}
                                    style={styles.cancelBtn}
                                >
                                    예약 취소
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    profileCard: {
        display: 'flex',
        alignItems: 'center',
        padding: '24px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        border: '1px solid #d8dee8',
        marginBottom: '32px',
        gap: '20px',
        flexWrap: 'wrap',
    },
    profileAvatar: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: '#004798',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        fontWeight: '700',
    },
    profileInfo: {
        flex: 1,
        minWidth: '200px',
    },
    profileName: {
        margin: '0 0 4px 0',
        fontSize: '1.4rem',
        color: '#111827',
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
    },
    profileMajor: {
        fontSize: '0.9rem',
        color: '#64748b',
        fontWeight: '500',
    },
    profileId: {
        margin: 0,
        color: '#94a3b8',
        fontSize: '0.95rem',
    },
    profileStats: {
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        padding: '8px 24px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    statLabel: {
        fontSize: '0.8rem',
        color: '#64748b',
        marginBottom: '2px',
    },
    statValue: {
        fontSize: '1.2rem',
        fontWeight: '800',
        color: '#004798',
    },
    statDivider: {
        width: '1px',
        height: '32px',
        backgroundColor: '#cbd5e1',
    },
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
        color: '#111827',
        borderBottomColor: '#004798',
        fontWeight: '800',
    },
    bookItemContainer: {
        position: 'relative',
        marginBottom: '16px',
    },
    actionArea: {
        position: 'absolute',
        top: '16px',
        right: '16px',
        display: 'flex',
        gap: '8px',
    },
    cancelBtn: {
        padding: '8px 16px',
        backgroundColor: '#fff',
        border: '1px solid #dc2626',
        color: '#dc2626',
        borderRadius: '6px',
        fontSize: '0.9rem',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    }
};

export default MyPage;
