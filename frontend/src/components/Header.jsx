import { Link } from 'react-router-dom';

const Header = () => {
    const isLoggedIn = false;

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/" style={styles.link}>강남대 중고교재</Link>
            </div>
            <ul style={styles.menu}>
                <li><Link to="/books" style={styles.link}>교재목록</Link></li>
                <li><Link to="/books/new" style={styles.link}>교재등록</Link></li>
                {isLoggedIn ? (
                    <>
                        <li><Link to="/mypage" style={styles.link}>마이페이지</Link></li>
                        <li><button style={styles.logoutBtn}>로그아웃</button></li>
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
    },
    logoutBtn: {
        backgroundColor: 'transparent',
        border: '1px solid #fff',
        color: '#fff',
        padding: '5px 10px',
        cursor: 'pointer',
    }
};

export default Header;
