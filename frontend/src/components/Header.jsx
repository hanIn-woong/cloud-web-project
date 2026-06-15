import { Link } from 'react-router-dom';

/**
 * 공통 상단 헤더 컴포넌트 (네비게이션 포함)
 */
const Header = () => {
    // TODO: 전역 상태관리(Context 등)에서 로그인 상태를 가져올 예정
    const isLoggedIn = false;

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/" style={styles.link}>📚 강남대 중고장터</Link>
            </div>
            <ul style={styles.menu}>
                <li><Link to="/books" style={styles.link}>교재목록</Link></li>
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
