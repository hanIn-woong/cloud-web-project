import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookForm from './pages/BookForm';
import LoginPage from './features/auth/LoginPage';
import SignupPage from './features/auth/SignupPage';
import CommentContainer from './features/comment/CommentContainer';
import BookList from './features/books/BookList';
import './App.css';

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

const BookDetail = () => {
    const { id } = useParams();
    return (
        <div style={{ padding: '20px' }}>
            <h1>교재 상세 정보 (ID: {id})</h1>
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h3>[구현 예정] 교재 정보 영역 (정민성)</h3>
                <p>제목, 저자, 가격 등의 정보가 표시됩니다.</p>
            </div>
            
            <CommentContainer bookId={parseInt(id)} />
        </div>
    );
};

const AppRoutes = () => (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
                <Route path="/" element={<HomePage />} />
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
