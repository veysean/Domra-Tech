import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:4000/api', //backend URL
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
  findAll: (page = 1, limit = 10) => API.get('/words', {
    params: { page, limit }
  }),
  searchWords: (query, page = 1, limit = 10) => API.get('/words/search', { params: { q: query, page, limit } }),
};
const res = await WordTranslationServices.findAll(1, 1000); 


//correction request
export const CorrectionServices = {
  requestCorrection: (correctionData) => API.post('/correctionRequests', correctionData),//create by user
  getCorrections: () => API.get('/correctionRequests'),
  getCorrectionById: (id) => API.get(`/correctionRequests/${id}`),// get by admin
  updateCorrectionStatus: (id, statusData) => API.patch(`/correctionRequests/${id}`, statusData),// update by admin
  deleteCorrection: (id) => API.delete(`/correctionRequests/${id}`),// delete by admin
};

//word request 
export const WordRequestServices = {
  createWordRequest: (wordRequestData) => API.post('/wordRequests', wordRequestData),
  getWordRequests: () => API.get('/wordRequests'),
  getWordRequestById: (id) => API.get(`/wordRequests/${id}`),
  updateWordRequest: (id, wordRequestData) => API.patch(`/wordRequests/${id}`, wordRequestData),
  deleteWordRequest: (id) => API.delete(`/wordRequests/${id}`),
};

//category
export const CategoryServices = {
  findAll: () => API.get('/categories'),
  findById: (id) => API.get(`/categories/${id}`),
};

export default API;