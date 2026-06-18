import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import knuLogo from '../assets/KNU_logo.png';

const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isAdmin, user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/" style={styles.link}>
                    <img src={knuLogo} alt="KNU Logo" style={styles.logoImg} />
                    강남대 중고교재
                </Link>
            </div>
            <ul style={styles.menu}>
                <li><Link to="/books" style={styles.link}>교재목록</Link></li>
                
                {/* 관리자가 아닐 때만 '교재등록' 표시 */}
                {(!isAuthenticated || !isAdmin) && (
                    <li><Link to="/books/new" style={styles.link}>교재등록</Link></li>
                )}

                {isAuthenticated ? (
                    <>
                        {/* 관리자일 때만 '관리자' 메뉴 표시 */}
                        {isAdmin && (
                            <li>
                                <Link to="/admin" style={styles.adminLink}>관리자</Link>
                            </li>
                        )}
                        
                        <li><span style={styles.userName}>{user?.name}님</span></li>
                        
                        {/* 관리자가 아닐 때만 '마이페이지', '찜목록' 표시 */}
                        {!isAdmin && (
                            <>
                                <li><Link to="/mypage" style={styles.link}>마이페이지</Link></li>
                                <li><Link to="/wishlist" style={styles.link}>찜목록</Link></li>
                            </>
                        )}
                        
                        <li><button type="button" onClick={handleLogout} style={styles.logoutBtn}>로그아웃</button></li>
                    </>
                ) : (
                    <li><Link to="/login" style={styles.link}>로그인</Link></li>
                )}
            </ul>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px',
        padding: '1rem 2rem',
        backgroundColor: '#004798',
        color: '#fff',
        flexWrap: 'wrap',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    menu: {
        display: 'flex',
        alignItems: 'center',
        listStyle: 'none',
        gap: '20px',
        margin: 0,
        padding: 0,
        flexWrap: 'wrap',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    adminLink: {
        color: '#ffeb3b',
        textDecoration: 'none',
        fontWeight: 'bold',
        border: '1px solid #ffeb3b',
        padding: '2px 8px',
        borderRadius: '4px',
    },
    logoImg: {
        height: '32px',
        width: 'auto',
    },
    userName: {
        fontWeight: 600,
    },
    logoutBtn: {
        backgroundColor: 'transparent',
        border: '1px solid #fff',
        color: '#fff',
        padding: '5px 10px',
        cursor: 'pointer',
    },
};

export default Header;
