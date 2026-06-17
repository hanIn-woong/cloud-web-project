import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../features/books/bookApi';
import './HomePage.css';

const HomePage = () => {
    const [recentBooks, setRecentBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecentBooks = async () => {
            try {
                const result = await getBooks({ page: 0, size: 4 });
                setRecentBooks(result.content);
            } catch (error) {
                console.error('Failed to fetch recent books:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecentBooks();
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section hero-section--no-image">
                <div className="hero-content">
                    <h1 className="hero-title">강남대학교 중고 교재 거래의 모든 것</h1>
                    <p className="hero-subtitle">
                        선후배 간의 따뜻한 나눔, 합리적인 가격으로 전공 서적을 거래하세요.
                    </p>
                    <div className="hero-actions">
                        <Link to="/books" className="btn btn-primary">교재 둘러보기</Link>
                        <Link to="/books/new" className="btn btn-secondary">교재 등록하기</Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-header">
                    <h2>왜 우리 사이트를 이용해야 하나요?</h2>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🎓</div>
                        <h3>학생 전용 커뮤니티</h3>
                        <p>강남대학교 학생들끼리 믿고 거래할 수 있는 안전한 환경을 제공합니다.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💰</div>
                        <h3>합리적인 가격</h3>
                        <p>비싼 새 책 대신 상태 좋은 중고 서적을 저렴하게 구입하세요.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🤝</div>
                        <h3>간편한 직거래</h3>
                        <p>학교 캠퍼스 내에서 직접 만나 물건을 확인하고 안전하게 거래하세요.</p>
                    </div>
                </div>
            </section>

            {/* Recent Books Section */}
            <section className="recent-books-section">
                <div className="section-header">
                    <h2>최근 등록된 교재</h2>
                    <Link to="/books" className="view-all">전체 보기 &rarr;</Link>
                </div>
                {isLoading ? (
                    <div className="loading-placeholder">교재를 불러오는 중...</div>
                ) : (
                    <div className="books-grid">
                        {recentBooks.length > 0 ? (
                            recentBooks.map((book) => (
                                <Link to={`/books/${book.id}`} key={book.id} className="book-card">
                                    <div className="book-info">
                                        <span className={`book-status ${book.status.toLowerCase()}`}>
                                            {book.status === 'SALE' ? '판매중' : book.status === 'RESERVED' ? '예약중' : '판매완료'}
                                        </span>
                                        <h3 className="book-title">{book.title}</h3>
                                        <p className="book-author">{book.author} | {book.publisher}</p>
                                        <p className="book-price">{book.price.toLocaleString()}원</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="no-books">현재 등록된 교재가 없습니다.</div>
                        )}
                    </div>
                )}
            </section>

            {/* Team Section */}
            <section className="team-section">
                <div className="section-header">
                    <h2>프로젝트 팀 소개</h2>
                    <p>클라우드기반웹개발 프로젝트 3팀</p>
                </div>
                <div className="team-grid">
                    <div className="team-member">
                        <span className="member-role">댓글 & 별점</span>
                        <span className="member-name">김태희</span>
                    </div>
                    <div className="team-member">
                        <span className="member-role">마이페이지 & 찜</span>
                        <span className="member-name">주승준</span>
                    </div>
                    <div className="team-member">
                        <span className="member-role">인프라 & 통합</span>
                        <span className="member-name">한인웅</span>
                    </div>
                    <div className="team-member">
                        <span className="member-role">교재 목록 & 검색</span>
                        <span className="member-name">정민성</span>
                    </div>
                    <div className="team-member">
                        <span className="member-role">교재 등록 & 수정</span>
                        <span className="member-name">김민호</span>
                    </div>
                    <div className="team-member">
                        <span className="member-role">회원 & 인증</span>
                        <span className="member-name">조건희</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
