import axios from 'axios';


const API = axios.create({
    // baseURL: 'http://localhost:3000/api', // backend URL
    // baseURL: 'https://domra-tech.onrender.com/api', // backend URL
    // baseURL: 'https://domra-tech-production-4129.up.railway.app', // backend URL
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

const token = localStorage.getItem('token');
if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Auth services
export const authServices = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
  // Request password reset link
  forgotPassword: (email) => API.post('/auth/forgot-password', { email }),
  // Reset password with token + confirmation
  resetPassword: (data) => API.post('/auth/reset-password', data),
  googleRegister: (data) => API.post("/auth/google-register", data),
  // verify email
  verifyEmail: (token) => API.get(`/auth/verify-email?token=${token}`),
};

// word translation services
export const WordTranslationServices = {
  findAll: (page = 1, limit = 10, categoryId = "") =>
    API.get("/words", {
      params: { page, limit, ...(categoryId && categoryId !== "all" && { categoryId })  },
    }),

  findById: (id) => API.get(`/words/${id}`),
  getFullWord: (id) => API.get(`/admin/words/${id}`), // full word details with categories
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
  getWordRequests: (page = 1, limit = 10, status = "", search = "", check = "") =>
    API.get('/wordRequests', {
      params: { page, limit, status, search, check }
    }),
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