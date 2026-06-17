package com.example.backend.domain.book;

import com.example.backend.common.BaseRepository;
import org.springframework.stereotype.Repository;
import jakarta.annotation.PostConstruct;

/**
 * 교재 저장소 (메모리 기반)
 */
@Repository
public class BookRepository extends BaseRepository<Book, Long> {

    /**
     * 초기 데이터 생성 (다양한 상태와 시나리오를 위한 테스트 데이터)
     */
    @PostConstruct
    public void init() {
        // [판매 중] 교재들
        save(new Book(1L, "데이터베이스 개론", "이석호", "정익사", 15000, "상", "김철수", 1L, BookStatus.SALE, null));
        save(new Book(2L, "자바의 정석", "남궁성", "도우출판", 20000, "최상", "이영희", 2L, BookStatus.SALE, null));
        save(new Book(3L, "운영체제론", "Abraham Silberschatz", "Pearson", 25000, "중", "박민수", 3L, BookStatus.SALE, null));
        save(new Book(4L, "알고리즘 문제 해결 전략", "구종만", "인사이트", 30000, "최상", "최지우", 4L, BookStatus.SALE, null));
        save(new Book(5L, "컴퓨터 네트워크", "James Kurose", "Pearson", 22000, "하", "정다은", 5L, BookStatus.SALE, null));
        
        // [예약 중] 교재들 (테스트용 세션 사용자 ID가 보통 6L이라고 가정하거나 마이페이지 담당자가 확인하기 위함)
        save(new Book(6L, "소프트웨어 공학", "최은만", "생능출판", 18000, "상", "한인웅", 6L, BookStatus.RESERVED, 1L)); // 김철수가 예약함
        save(new Book(7L, "이산수학", "박종안", "경문사", 12000, "중", "조현우", 7L, BookStatus.RESERVED, 6L)); // 한인웅이 예약함
        
        // [판매 완료] 교재들 (마이페이지 구매 내역 테스트용)
        save(new Book(8L, "인공지능: 현대적 접근방식", "Stuart Russell", "제이펍", 35000, "최상", "강하늘", 8L, BookStatus.SOLD, 6L)); // 한인웅이 구매함
        save(new Book(9L, "컴퓨터 구조", "David Patterson", "한티미디어", 28000, "상", "윤서연", 9L, BookStatus.SOLD, 1L)); // 김철수가 구매함
        
        // 추가 데이터
        save(new Book(10L, "파이썬 프로그래밍", "박응용", "이지스퍼블리싱", 14000, "최상", "임재범", 10L, BookStatus.SALE, null));
        save(new Book(11L, "C 언어 코딩 도장", "남재윤", "길벗", 16000, "상", "한인웅", 6L, BookStatus.SALE, null));
        save(new Book(12L, "Spring Boot in Action", "Craig Walls", "Manning", 22000, "최상", "김태희", 11L, BookStatus.SALE, null));
    }
}
