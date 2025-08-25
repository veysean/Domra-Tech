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
  findAll: () => API.get('/words')
};

export const searchWords = (query) => {
  return API.get('/words/search', { params: { q: query } });
}



export default API;