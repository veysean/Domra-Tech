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
  findAll: (page = 1, limit = 10, categoryId = "") =>
    API.get("/words", {
      params: { page, limit, categoryId },
    }),

  findById: (id) => API.get(`/words/${id}`),
  searchWords: (query, page = 1, limit = 10, categoryId = "") =>
    API.get("/words/search", {
      params: { q: query, page, limit, categoryId },
    }),
  update: (id, updatedData) => API.put(`/admin/words/${id}`, updatedData),
};

// category services
export const CategoryServices = {
  getAll: () => API.get('/categories'),
};

export default API;