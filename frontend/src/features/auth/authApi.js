import api from '../../ApiService';

export const login = (credentials) => api.post('/api/auth/login', credentials);
export const signup = (data) => api.post('/api/auth/signup', data);
export const logout = () => api.post('/api/auth/logout');
export const getMe = () => api.get('/api/auth/me');
