package com.example.backend.domain.user;

import com.example.backend.common.ApiResponse;
import com.example.backend.domain.book.Book;
import com.example.backend.domain.book.BookRepository;
import com.example.backend.domain.wishlist.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final BookRepository bookRepository;
    private final WishlistService wishlistService;
    private final UserRepository userRepository;

    @GetMapping("/{id}/books")
    public ApiResponse<List<Book>> getMyBooks(@PathVariable Long id) {
        List<Book> myBooks = bookRepository.findAll().stream()
                .filter(book -> book.getSellerId() != null && book.getSellerId().equals(id))
                .collect(Collectors.toList());
        return ApiResponse.success(myBooks);
    }

    @GetMapping("/{id}/wishes")
    public ApiResponse<List<Book>> getMyWishes(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        
        List<Book> wishes = wishlistService.getWishList(user.getUserId());
        return ApiResponse.success(wishes);
    }
}
