import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BookForm from './pages/BookForm';
import './App.css';

// 임시 페이지 컴포넌트 (팀원들이 각자 구현할 영역)
const Home = () => <div style={{ padding: '20px' }}><h1>메인 페이지</h1><p>강남대 중고 교재 거래 사이트에 오신 것을 환영합니다.</p></div>;
const Login = () => <div style={{ padding: '20px' }}><h1>로그인 페이지</h1><p>로그인 기능 구현 예정 (조건희)</p></div>;
const BookList = () => <div style={{ padding: '20px' }}><h1>교재 목록</h1><p>교재 목록 및 검색 기능 구현 예정 (정민성)</p></div>;
const MyPage = () => <div style={{ padding: '20px' }}><h1>마이페이지</h1><p>회원 정보 및 찜 목록 (주승준)</p></div>;

/**
 * 보호된 라우트 컴포넌트 (로그인 여부 체크)
 * 현재는 간단하게 true/false로 구조만 잡아둡니다.
 */
const PrivateRoute = ({ children }) => {
    const isAuthenticated = false; // TODO: 실제 인증 상태와 연동 필요
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
    return (
        <ToastProvider>
            <Router>
                <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Header />
                    <main style={{ flex: 1 }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/books" element={<BookList />} />
                            <Route path="/books/new" element={<BookForm />} />
                            <Route path="/books/register" element={<BookForm />} />
                            <Route path="/books/:id/edit" element={<BookForm />} />
                            
                            {/* 로그인한 사용자만 접근 가능한 라우트 예시 */}
                            <Route 
                                path="/mypage" 
                                element={
                                    <PrivateRoute>
                                        <MyPage />
                                    </PrivateRoute>
                                } 
                            />
                            
                            {/* 정의되지 않은 경로는 홈으로 리다이렉트 */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </ToastProvider>
    );
}

export default App;
