import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
<<<<<<< HEAD
import knuLogo from '../assets/KNU_logo.png';
=======
>>>>>>> feature/mypage-wishlist

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
<<<<<<< HEAD
                <Link to="/" style={styles.link}>
                    <img src={knuLogo} alt="KNU Logo" style={styles.logoImg} />
                    강남대 중고교재
                </Link>
=======
                <Link to="/" style={styles.link}>강남대 중고교재</Link>
>>>>>>> feature/mypage-wishlist
            </div>
            <ul style={styles.menu}>
                <li><Link to="/books" style={styles.link}>교재목록</Link></li>
                <li><Link to="/books/new" style={styles.link}>교재등록</Link></li>
                {isAuthenticated ? (
                    <>
                        <li><span style={styles.userName}>{user?.name}님</span></li>
                        <li><Link to="/mypage" style={styles.link}>마이페이지</Link></li>
<<<<<<< HEAD
=======
                        <li><Link to="/wishlist" style={styles.link}>찜목록</Link></li>
>>>>>>> feature/mypage-wishlist
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
<<<<<<< HEAD
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    logoImg: {
        height: '32px',
        width: 'auto',
=======
>>>>>>> feature/mypage-wishlist
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
