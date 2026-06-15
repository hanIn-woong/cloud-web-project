import axios from 'axios';

/**
 * 백엔드 API와의 통신을 위한 공통 Axios 인스턴스
 */
const API_BASE_URL = 'http://localhost:8080';

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

export default api;
