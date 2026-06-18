import { useState, useEffect } from 'react';
import { adminApi } from '../ApiService';
import { useToast } from '../context/ToastContext';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('stats');
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const { showToast, setIsLoading } = useToast();

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            if (activeTab === 'stats') {
                const data = await adminApi.getStats();
                setStats(data);
            } else if (activeTab === 'users') {
                const data = await adminApi.getUsers();
                setUsers(data);
            } else if (activeTab === 'books') {
                const data = await adminApi.getBooks();
                setBooks(data);
            }
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('정말 이 사용자를 강제 탈퇴시키겠습니까?')) return;
        try {
            await adminApi.deleteUser(userId);
            showToast('사용자가 삭제되었습니다.', 'success');
            setUsers(users.filter(u => u.id !== userId));
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    const handleDeleteBook = async (bookId) => {
        if (!window.confirm('정말 이 게시물을 삭제하시겠습니까?')) return;
        try {
            await adminApi.deleteBook(bookId);
            showToast('게시물이 삭제되었습니다.', 'success');
            setBooks(books.filter(b => b.id !== bookId));
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>시스템 관리자 센터</h1>

            <div style={styles.tabs}>
                <button 
                    style={{...styles.tab, ...(activeTab === 'stats' ? styles.activeTab : {})}} 
                    onClick={() => setActiveTab('stats')}
                >
                    대시보드
                </button>
                <button 
                    style={{...styles.tab, ...(activeTab === 'users' ? styles.activeTab : {})}} 
                    onClick={() => setActiveTab('users')}
                >
                    사용자 관리
                </button>
                <button 
                    style={{...styles.tab, ...(activeTab === 'books' ? styles.activeTab : {})}} 
                    onClick={() => setActiveTab('books')}
                >
                    전체 도서 관리
                </button>
            </div>

            <div style={styles.content}>
                {activeTab === 'stats' && stats && (
                    <div style={styles.statsGrid}>
                        <div style={styles.statCard}>
                            <h3>총 사용자</h3>
                            <p style={styles.statNumber}>{stats.totalUsers}명</p>
                        </div>
                        <div style={styles.statCard}>
                            <h3>총 등록 도서</h3>
                            <p style={styles.statNumber}>{stats.totalBooks}권</p>
                        </div>
                        <div style={styles.statCard}>
                            <h3>판매 중</h3>
                            <p style={{...styles.statNumber, color: '#4caf50'}}>{stats.booksOnSale}권</p>
                        </div>
                        <div style={styles.statCard}>
                            <h3>예약 중</h3>
                            <p style={{...styles.statNumber, color: '#ff9800'}}>{stats.booksReserved}권</p>
                        </div>
                        <div style={styles.statCard}>
                            <h3>판매 완료</h3>
                            <p style={{...styles.statNumber, color: '#757575'}}>{stats.booksSold}권</p>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeader}>
                                <th>ID</th>
                                <th>학번(ID)</th>
                                <th>이름</th>
                                <th>전공</th>
                                <th>권한</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} style={styles.tableRow}>
                                    <td>{user.id}</td>
                                    <td>{user.userId}</td>
                                    <td>{user.name}</td>
                                    <td>{user.major}</td>
                                    <td>{user.isAdmin ? <span style={styles.adminBadge}>Admin</span> : 'Member'}</td>
                                    <td>
                                        {!user.isAdmin && (
                                            <button 
                                                style={styles.deleteBtn}
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                강제탈퇴
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {activeTab === 'books' && (
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeader}>
                                <th>ID</th>
                                <th>도서명</th>
                                <th>판매자</th>
                                <th>가격</th>
                                <th>상태</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book.id} style={styles.tableRow}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.seller}</td>
                                    <td>{book.price.toLocaleString()}원</td>
                                    <td>{book.status}</td>
                                    <td>
                                        <button 
                                            style={styles.deleteBtn}
                                            onClick={() => handleDeleteBook(book.id)}
                                        >
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    title: {
        color: '#004798',
        marginBottom: '2rem',
    },
    tabs: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #eee',
    },
    tab: {
        padding: '10px 20px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#666',
    },
    activeTab: {
        color: '#004798',
        borderBottom: '2px solid #004798',
    },
    content: {
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
    },
    statCard: {
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #eee',
        textAlign: 'center',
    },
    statNumber: {
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: '10px 0 0',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#f8f9fa',
        textAlign: 'left',
    },
    tableRow: {
        borderBottom: '1px solid #eee',
    },
    adminBadge: {
        backgroundColor: '#004798',
        color: '#fff',
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '0.8rem',
    },
    deleteBtn: {
        backgroundColor: '#ff5252',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default AdminPage;
