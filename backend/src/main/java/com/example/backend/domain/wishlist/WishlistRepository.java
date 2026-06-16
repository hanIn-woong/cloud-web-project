package com.example.backend.domain.wishlist;

import com.example.backend.common.BaseRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

/**
 * 찜 목록 저장소
 */
@Repository
public class WishlistRepository extends BaseRepository<WishItem, Long> {

    @PostConstruct
    public void init() {
        save(new WishItem(1L, "admin", 2L)); // 관리자가 '자바의 정석'을 찜함
    }
}
