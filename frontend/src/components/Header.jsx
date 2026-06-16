import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/" style={styles.link}>📚 강남대 중고장터</Link>
            </div>
            <ul style={styles.menu}>
                <li><Link to="/books" style={styles.link}>교재목록</Link></li>
                {isAuthenticated ? (
                    <>
                        <li><span style={styles.userName}>{user?.name}님</span></li>
                        <li><Link to="/mypage" style={styles.link}>마이페이지</Link></li>
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
        padding: '1rem 2rem',
        backgroundColor: '#004798',
        color: '#fff',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    menu: {
        display: 'flex',
        listStyle: 'none',
        gap: '20px',
        margin: 0,
        alignItems: 'center',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
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
