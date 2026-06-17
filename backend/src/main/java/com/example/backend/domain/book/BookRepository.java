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
     * 초기 데이터 생성 (10개의 임의 교재)
     */
    @PostConstruct
    public void init() {
        save(Book.builder().id(1L).title("데이터베이스 개론").author("이석호").publisher("정익사").price(15000).condition("상").seller("김철수").sellerId(1L).status(BookStatus.SALE).createdAt(System.currentTimeMillis()).build());
        save(Book.builder().id(2L).title("자바의 정석").author("남궁성").publisher("도우출판").price(20000).condition("최상").seller("이영희").sellerId(2L).status(BookStatus.SALE).createdAt(System.currentTimeMillis()).build());
        save(Book.builder().id(3L).title("운영체제론").author("Abraham Silberschatz").publisher("Pearson").price(25000).condition("중").seller("박민수").sellerId(3L).status(BookStatus.SALE).createdAt(System.currentTimeMillis()).build());
        save(Book.builder().id(4L).title("알고리즘 문제 해결 전략").author("구종만").publisher("인사이트").price(30000).condition("최상").seller("최지우").sellerId(4L).status(BookStatus.SALE).createdAt(System.currentTimeMillis()).build());
        save(Book.builder().id(5L).title("컴퓨터 네트워크").author("James Kurose").publisher("Pearson").price(22000).condition("하").seller("정다은").sellerId(5L).status(BookStatus.SALE).createdAt(System.currentTimeMillis()).build());
        save(Book.builder().id(6L).title("소프트웨어 공학").author("최은만").publisher("생능출판").price(18000).condition("상").seller("한인웅").sellerId(6L).status(BookStatus.SALE).createdAt(System.currentTimeMillis()).build());
        save(Book.builder().id(7L).title("이산수학").author("박종안").publisher("경문사").price(12000).condition("중").seller("조현우").sellerId(7L).status(BookStatus.SALE).createdAt(System.currentTimeMillis()).build());
        save(Book.builder().id(8L).title("인공지능: 현대적 접근방식").author("Stuart Russell").publisher("제이펍").price(35000).condition("최상").seller("강하늘").sellerId(8L).status(BookStatus.SALE).createdAt(System.currentTimeMillis()).build());
        save(Book.builder().id(9L).title("컴퓨터 구조").author("David Patterson").publisher("한티미디어").price(28000).condition("상").seller("윤서연").sellerId(9L).status(BookStatus.SALE).createdAt(System.currentTimeMillis()).build());
        save(Book.builder().id(10L).title("파이썬 프로그래밍").author("박응용").publisher("이지스퍼블리싱").price(14000).condition("최상").seller("임재범").sellerId(10L).status(BookStatus.SALE).createdAt(System.currentTimeMillis()).build());
    }
}
