import axios from 'axios';

/**
 * 백엔드 API와의 통신을 위한 공통 Axios 인스턴스
 * Codespace 환경에서는 포트 포워딩 주소를 자동으로 감지합니다.
 */
const getBaseUrl = () => {
    const { hostname } = window.location;
    if (hostname.includes('github.dev') || hostname.includes('app.github.dev')) {
        // 현재 프론트엔드 URL(5173)을 기반으로 백엔드 URL(8080)을 추론합니다.
        return `https://${hostname.replace('-5173', '-8080')}`;
    }
    return 'http://localhost:8080';
};

const API_BASE_URL = getBaseUrl();

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // 쿠키 등 자격 증명 포함
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * 응답 인터셉터
 * 백엔드에서 내려주는 { success, data, message } 규격을 처리합니다.
 */
api.interceptors.response.use(
    (response) => {
        const { success, data, message } = response.data;

        if (success) {
            return data; // 성공 시 데이터만 반환
        } else {
            // success가 false인 경우 에러로 처리
            return Promise.reject(new Error(message || '요청 처리에 실패했습니다.'));
        }
    },
    (error) => {
        // HTTP 상태 코드가 2xx가 아닌 경우
        const errorMessage = error.response?.data?.message || '서버와의 통신 중 오류가 발생했습니다.';
        return Promise.reject(new Error(errorMessage));
    }
);

export const authApi = {
    signup: (data) => api.post('/api/auth/signup', data),
    login: (data) => api.post('/api/auth/login', data),
    logout: () => api.post('/api/auth/logout'),
    me: () => api.get('/api/auth/me'),
};

export const commentApi = {
    getComments: (bookId) => api.get(`/api/books/${bookId}/comments`),
    addComment: (bookId, data) => api.post(`/api/books/${bookId}/comments`, data),
    deleteComment: (bookId, commentId) => api.delete(`/api/books/${bookId}/comments/${commentId}`),
};

export const wishApi = {
    toggleWish: (bookId) => api.post('/api/wishes', { bookId }),
};

export const memberApi = {
    getMyBooks: (memberId) => api.get(`/api/members/${memberId}/books`),
    getMyWishes: (memberId) => api.get(`/api/members/${memberId}/wishes`),
};

export const adminApi = {
    getStats: () => api.get('/api/admin/stats'),
    getUsers: () => api.get('/api/admin/users'),
    deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
    getBooks: () => api.get('/api/admin/books'),
    deleteBook: (id) => api.delete(`/api/admin/books/${id}`),
};

export default api;
