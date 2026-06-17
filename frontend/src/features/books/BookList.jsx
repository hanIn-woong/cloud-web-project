import { useEffect, useState } from 'react';
import { getBooks } from './bookApi';
import SearchBar from './components/SearchBar';
import BookTableRow from './components/BookTableRow';
import './BookList.css';

const PAGE_SIZE = 10;

const useDebounce = (value, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timerId = window.setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => window.clearTimeout(timerId);
    }, [value, delay]);

    return debouncedValue;
};

const BookList = () => {
    const [keyword, setKeyword] = useState('');
    const [condition, setCondition] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(0);
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const debouncedKeyword = useDebounce(keyword);

    useEffect(() => {
        let ignore = false;

        const loadBooks = async () => {
            setIsLoading(true);
            setErrorMessage('');

            try {
                const result = await getBooks({
                    keyword: debouncedKeyword.trim(),
                    condition,
                    status,
                    page,
                    size: PAGE_SIZE,
                });

                if (!ignore) {
                    setBooks(result.content);
                    setTotalPages(result.totalPages);
                    setTotalElements(result.totalElements);
                }
            } catch (error) {
                if (!ignore) {
                    setBooks([]);
                    setTotalPages(0);
                    setTotalElements(0);
                    setErrorMessage(error.message || '교재 목록을 불러오지 못했습니다.');
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        };

        loadBooks();

        return () => {
            ignore = true;
        };
    }, [debouncedKeyword, condition, status, page]);

    const handleKeywordChange = (value) => {
        setKeyword(value);
        setPage(0);
    };

    const handleConditionChange = (value) => {
        setCondition(value);
        setPage(0);
    };

    const handleStatusChange = (value) => {
        setStatus(value);
        setPage(0);
    };

    const handleReset = () => {
        setKeyword('');
        setCondition('');
        setStatus('');
        setPage(0);
    };

    return (
        <div className="book-page">
            <header className="book-page__header">
                <h1>교재 목록</h1>
                <p>교재명, 저자, 출판사로 원하는 중고 교재를 찾아보세요.</p>
            </header>

            <SearchBar
                keyword={keyword}
                condition={condition}
                status={status}
                onKeywordChange={handleKeywordChange}
                onConditionChange={handleConditionChange}
                onStatusChange={handleStatusChange}
                onReset={handleReset}
            />

            <div className="book-page__summary">
                <span>총 {totalElements.toLocaleString('ko-KR')}권</span>
                {isLoading && <span>불러오는 중...</span>}
            </div>

            {errorMessage && <p className="book-page__message book-page__message--error">{errorMessage}</p>}

            {!errorMessage && !isLoading && books.length === 0 && (
                <p className="book-page__message">일치하는 교재가 없습니다.</p>
            )}

            <div className="book-list">
                {isLoading
                    ? Array.from({ length: 3 }).map((_, index) => (
                          <div key={index} className="book-row book-row--skeleton" />
                      ))
                    : books.map((book) => <BookTableRow key={book.id} book={book} />)}
            </div>

            <div className="book-pagination" aria-label="교재 목록 페이지 이동">
                <button type="button" onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
                    이전
                </button>
                <span>
                    {totalPages === 0 ? 0 : page + 1} / {totalPages}
                </span>
                <button
                    type="button"
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={totalPages === 0 || page >= totalPages - 1}
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default BookList;
