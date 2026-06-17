package com.example.backend.domain.book;

import com.example.backend.common.GlobalExceptionHandler;
import com.example.backend.domain.book.dto.BookRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

class BookControllerTest {

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        BookRepository bookRepository = new BookRepository();
        bookRepository.init();
        BookService bookService = new BookService(bookRepository);
        BookController bookController = new BookController(bookService);

        objectMapper = new ObjectMapper();
        mockMvc = standaloneSetup(bookController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void bookCrudAndSearchFlowWorks() throws Exception {
        BookRequest createRequest = new BookRequest(
                "Searchable Title",
                "Hong Gildong",
                "Cloud Press",
                12000,
                "상",
                "gildong"
        );

        String createdBody = mockMvc.perform(post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("Searchable Title"))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode createdJson = objectMapper.readTree(createdBody);
        long createdId = createdJson.path("data").path("id").asLong();
        assertTrue(createdId > 0);

        mockMvc.perform(get("/api/books/{id}", createdId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.author").value("Hong Gildong"));

        mockMvc.perform(get("/api/books/search").param("keyword", "Searchable"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content[0].title").value("Searchable Title"));

        BookRequest updateRequest = new BookRequest(
                "Updated Title",
                "Hong Gildong",
                "Cloud Press",
                15000,
                "중",
                "gildong"
        );

        mockMvc.perform(put("/api/books/{id}", createdId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("Updated Title"))
                .andExpect(jsonPath("$.data.price").value(15000));

        mockMvc.perform(delete("/api/books/{id}", createdId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").isNotEmpty());

        mockMvc.perform(get("/api/books/{id}", createdId))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }
}
