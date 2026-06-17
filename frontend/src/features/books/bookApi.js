import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const getBooks = async ({ keyword, condition, status, page, size }) => {
    const hasSearchFilter = Boolean(keyword || condition || status);
    const endpoint = hasSearchFilter ? '/api/books/search' : '/api/books';

    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
        params: {
            keyword: keyword || undefined,
            condition: condition || undefined,
            status: status || undefined,
            page,
            size,
        },
        withCredentials: true,
    });

    const body = response.data?.data ?? response.data;
    return {
        content: body?.content ?? [],
        totalPages: body?.totalPages ?? 0,
        totalElements: body?.totalElements ?? 0,
    };
};

export const getBook = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/api/books/${id}`, {
        withCredentials: true,
    });

    return response.data?.data ?? response.data;
};
