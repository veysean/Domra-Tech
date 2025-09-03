import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api', //backend URL
});

const token = localStorage.getItem('token');
if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Auth services
export const authServices = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
};

// word translation services
export const WordTranslationServices = {
  findAll: () => API.get('/words'),
  searchWords: (query) => API.get('/words/search', { params: { q: query } }),
};

// word request services
export const userServices = {
  getProfile: () => API.get('/profile'),
  updateProfile: (data) => API.put('/profile', data),
  deleteAccount: () => API.delete('/profile'),

  // Admin endpoints
  getAll: (page = 1, limit = 60) => API.get('/users', { params: { page, limit } }),
  deleteUser: (id) => API.delete(`/users/${id}`),
  updateUser: (id, data) => API.put(`/users/${id}`, data),
};

// request services
export const requestServices = {
  getRecent: () => API.get("/requests/recent"),
};

// stats services
export const statsServices = {
  getStats: () => API.get("/stats"),
};

export default API;