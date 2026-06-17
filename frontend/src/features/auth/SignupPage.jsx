import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const THEME_COLOR = '#004798';

const SignupPage = () => {
    const navigate = useNavigate();
    const { signup, isAuthenticated } = useAuth();
    const { showToast, setIsLoading } = useToast();
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        name: '',
        major: '',
    });

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            await signup(formData);
            showToast('회원가입이 완료되었습니다. 로그인해 주세요.', 'success');
            navigate('/login');
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>회원가입</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>
                        아이디
                        <input
                            type="text"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </label>
                    <label style={styles.label}>
                        비밀번호
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </label>
                    <label style={styles.label}>
                        이름
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </label>
                    <label style={styles.label}>
                        전공
                        <input
                            type="text"
                            name="major"
                            value={formData.major}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </label>
                    <button type="submit" style={styles.button}>
                        회원가입
                    </button>
                </form>
                <p style={styles.footerText}>
                    이미 계정이 있으신가요?{' '}
                    <Link to="/login" style={styles.link}>
                        로그인
                    </Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '40px 20px',
        boxSizing: 'border-box',
    },
    card: {
        width: '100%',
        maxWidth: '420px',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    title: {
        margin: '0 0 24px',
        color: THEME_COLOR,
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontWeight: 600,
    },
    input: {
        padding: '10px 12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem',
    },
    button: {
        marginTop: '8px',
        padding: '12px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: THEME_COLOR,
        color: '#fff',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
    },
    footerText: {
        marginTop: '20px',
        textAlign: 'center',
        color: '#666',
    },
    link: {
        color: THEME_COLOR,
        textDecoration: 'none',
        fontWeight: 600,
    },
};

export default SignupPage;
