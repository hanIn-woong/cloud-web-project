import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BookForm from './pages/BookForm';
import LoginPage from './features/auth/LoginPage';
import SignupPage from './features/auth/SignupPage';
import BookList from './features/books/BookList';
import BookDetail from './features/books/BookDetail';
import './App.css';

const Home = () => (
    <div style={{ padding: '20px' }}>
        <h1>메인 페이지</h1>
        <p>강남대 중고 교재 거래 사이트에 오신 것을 환영합니다.</p>
    </div>
);

const MyPage = () => (
    <div style={{ padding: '20px' }}>
        <h1>마이페이지</h1>
        <p>회원 정보 및 찜 목록 (주승준)</p>
    </div>
);

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div style={{ padding: '20px' }}>인증 상태를 확인하는 중...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/books/:id" element={<BookDetail />} />
                <Route path="/books/new" element={<BookForm />} />
                <Route path="/books/:id/edit" element={<BookForm />} />
                <Route
                    path="/mypage"
                    element={
                        <PrivateRoute>
                            <MyPage />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </main>
        <Footer />
    </div>
);

function App() {
    return (
        <ToastProvider>
            <AuthProvider>
                <Router>
                    <AppRoutes />
                </Router>
            </AuthProvider>
        </ToastProvider>
    );
}

export default App;
