package com.example.backend.domain.wishlist;

import com.example.backend.domain.book.Book;
import com.example.backend.domain.book.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final BookRepository bookRepository;

    public void toggleWish(String userId, Long bookId) {
        // 이미 해당 사용자가 해당 도서를 찜했는지 확인
        Optional<WishItem> existing = wishlistRepository.findAll().stream()
                .filter(item -> item.getUserId().equals(userId) && item.getBookId().equals(bookId))
                .findFirst();

        if (existing.isPresent()) {
            wishlistRepository.deleteById(existing.get().getId());
        } else {
            Long nextId = wishlistRepository.findAll().stream()
                    .mapToLong(WishItem::getId)
                    .max()
                    .orElse(0L) + 1L;
            wishlistRepository.save(new WishItem(nextId, userId, bookId));
        }
    }

    public List<Book> getWishList(String userId) {
        List<Long> bookIds = wishlistRepository.findAll().stream()
                .filter(item -> item.getUserId().equals(userId))
                .map(WishItem::getBookId)
                .collect(Collectors.toList());

        return bookRepository.findAll().stream()
                .filter(book -> bookIds.contains(book.getId()))
                .collect(Collectors.toList());
    }
    
    public boolean isWished(String userId, Long bookId) {
        return wishlistRepository.findAll().stream()
                .anyMatch(item -> item.getUserId().equals(userId) && item.getBookId().equals(bookId));
    }
}
