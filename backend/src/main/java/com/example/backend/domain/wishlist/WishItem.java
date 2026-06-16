package com.example.backend.domain.wishlist;

import com.example.backend.common.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 찜 목록 엔티티 (담당: 주승준)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WishItem implements BaseEntity<Long> {
    private Long id;
    private String userId; // 찜한 사용자 ID
    private Long bookId;   // 찜한 교재 ID

    @Override
    public Long getId() {
        return id;
    }
}
