import axios from 'axios';


const API = axios.create({
    baseURL: 'https://domra-tech-production-4ff1.up.railway.app/api', // backend URL
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
      params: { page, limit, ...(categoryId && categoryId !== "all" && { categoryId })  },
    }),

  findById: (id) => API.get(`/words/${id}`),

  searchWords: (query, page = 1, limit = 10, categoryId = "") =>
    API.get("/words/search", {
      params: { q: query, page, limit, ...(categoryId && categoryId !== "all" && { categoryId }) },
    }),

  create: (wordData) => API.post('/admin/words', wordData),
  update: (id, updatedData) => API.put(`/admin/words/${id}`, updatedData),
};

// user services
export const userServices = {
  getProfile: () => API.get('/profile'),
  updateProfile: (data) => API.put('/profile', data),
  deleteAccount: () => API.delete('/profile'),

  // Admin endpoints
  getAll: (page = 1, limit = 60, sortField = 'userId', sortOrder = 'asc') =>
    API.get('/admin/users', {
      params: { page, limit, sortField, sortOrder }
    }),
  updateUser: (id, data) => API.put(`/admin/users/${id}`, data),
  deleteUser: (id, data) => API.put(`/admin/users/${id}`, data),
};


// request services
export const requestServices = {
  getRecent: () => API.get("/requests/recent"),
};

// stats services
export const statsServices = {
  getStats: () => API.get("/stats"),
};

// correction request
export const CorrectionServices = {
  requestCorrection: (correctionData) => API.post('/correctionRequests', correctionData), // create by user
  getCorrections: () => API.get('/correctionRequests'),
  getCorrectionById: (id) => API.get(`/correctionRequests/${id}`), // get by admin
  updateCorrectionStatus: (id, statusData) => API.patch(`/correctionRequests/${id}`, statusData), // update by admin
  deleteCorrection: (id) => API.delete(`/correctionRequests/${id}`), // delete by admin
};

// word request
export const WordRequestServices = {
  createWordRequest: (data) => API.post('/wordRequests', data),
  getWordRequests: (page = 1, limit = 10) =>
    API.get('/wordRequests', { params: { page, limit } }),
  getWordRequestById: (id) => API.get(`/wordRequests/${id}`),
  updateWordRequest: (id, data) => API.put(`/wordRequests/${id}`, data),
  deleteWordRequest: (id) => API.delete(`/wordRequests/${id}`),
  getTodayWordRequests: () => API.get('/wordRequests/today').then((res) => res.data),
};


// category
export const CategoryServices = {
  findAll: () => API.get('/categories'),
  findById: (id) => API.get(`/categories/${id}`),
  getAll: () => API.get('/categories'),
};

// favorite
export const FavoriteServices = {
  createFavorite: (wordId) => API.post('/favorites', { wordId }),
  getAllFavorites: () => API.get('/favorites'),
  deleteFavorite: (wordId) => API.delete(`/favorites/${wordId}`)
};

export default API;