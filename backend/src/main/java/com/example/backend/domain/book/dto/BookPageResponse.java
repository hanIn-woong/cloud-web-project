package com.example.backend.domain.book.dto;

import com.example.backend.domain.book.Book;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BookPageResponse {
    private List<Book> content;
    private int totalPages;
    private long totalElements;
}
