const conditions = [
    { value: '', label: '전체 상태' },
    { value: '상', label: '상' },
    { value: '중', label: '중' },
    { value: '하', label: '하' },
];

const saleStatuses = [
    { value: '', label: '전체 판매상태' },
    { value: 'SALE', label: '판매중' },
    { value: 'RESERVED', label: '예약중' },
    { value: 'SOLD', label: '완료' },
];

const SearchBar = ({
    keyword,
    condition,
    status,
    onKeywordChange,
    onConditionChange,
    onStatusChange,
    onReset,
}) => (
    <section className="book-search" aria-label="교재 검색">
        <div className="book-search__field">
            <label htmlFor="book-keyword">검색어</label>
            <input
                id="book-keyword"
                type="text"
                value={keyword}
                onChange={(event) => onKeywordChange(event.target.value)}
                placeholder="교재명, 저자, 출판사를 입력하세요"
            />
        </div>

        <div className="book-search__field">
            <label htmlFor="book-condition">책 상태</label>
            <select
                id="book-condition"
                value={condition}
                onChange={(event) => onConditionChange(event.target.value)}
            >
                {conditions.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>

        <div className="book-search__field">
            <label htmlFor="book-status">판매 상태</label>
            <select
                id="book-status"
                value={status}
                onChange={(event) => onStatusChange(event.target.value)}
            >
                {saleStatuses.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>

        <button type="button" className="book-search__reset" onClick={onReset}>
            초기화
        </button>
    </section>
);

export default SearchBar;
