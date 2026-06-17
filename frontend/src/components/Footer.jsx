<<<<<<< HEAD
import knuLogo from '../assets/KNU_logo.png';

=======
>>>>>>> feature/mypage-wishlist
/**
 * 공통 하단 바 컴포넌트
 */
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.info}>
<<<<<<< HEAD
                    <h3 style={styles.title}>
                        <img src={knuLogo} alt="KNU Logo" style={styles.footerLogo} />
                        강남대 중고교재
                    </h3>
                    <p style={styles.text}>학습 목적의 풀스택 팀 프로젝트입니다.</p>
                </div>
                <div className="copyright">
                    <p style={styles.text}>&copy; {currentYear} 3팀 (김태희, 주승준, 한인웅, 정민성, 김민호, 조건희). All rights reserved.</p>
                </div>

=======
                    <h3 style={styles.title}>📚 강남대 중고장터</h3>
                    <p style={styles.text}>학습 목적의 풀스택 팀 프로젝트입니다.</p>
                </div>
                <div style={styles.copyright}>
                    <p style={styles.text}>&copy; {currentYear} 3팀 (한인웅, 조건희, 정민성, 김민호, 김태희, 주승준). All rights reserved.</p>
                </div>
>>>>>>> feature/mypage-wishlist
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#004798',
        color: '#fff',
        padding: '2rem 2rem',
        marginTop: 'auto', // 메인 콘텐츠가 적어도 하단에 고정되도록 함
        borderTop: '1px solid #003674',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
    },
    info: {
        textAlign: 'center',
    },
    title: {
        margin: '0 0 0.5rem 0',
        fontSize: '1.2rem',
<<<<<<< HEAD
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    },
    footerLogo: {
        height: '24px',
        width: 'auto',
=======
>>>>>>> feature/mypage-wishlist
    },
    copyright: {
        borderTop: '1px solid #0056B3',
        paddingTop: '1rem',
        width: '100%',
        textAlign: 'center',
    },
    text: {
        margin: 0,
        fontSize: '0.9rem',
        color: '#ccc',
    }
};

export default Footer;
