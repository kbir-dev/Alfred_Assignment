import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with custom config
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const api = {
  setAuthToken: (token) => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  },

  // Auth endpoints
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      if (response.data.token) {
        api.setAuthToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  signup: async (username, email, password) => {
    try {
      const response = await axiosInstance.post('/auth/signup', { username, email, password });
      if (response.data.token) {
        api.setAuthToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      throw error;
    }
  },

  verifyToken: async (token) => {
    try {
      api.setAuthToken(token);
      const response = await axiosInstance.get('/auth/verify');
      return response.data;
    } catch (error) {
      console.error('Token verification error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Flashcard endpoints
  getFlashcards: async () => {
    try {
      const response = await axiosInstance.get('/flashcards');
      return response.data;
    } catch (error) {
      console.error('Get flashcards error:', error.response?.data || error.message);
      throw error;
    }
  },

  createFlashcard: async (flashcard) => {
    try {
      const response = await axiosInstance.post('/flashcards', flashcard);
      return response.data;
    } catch (error) {
      console.error('Create flashcard error:', error.response?.data || error.message);
      throw error;
    }
  },

  updateFlashcard: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/flashcards/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Update flashcard error:', error.response?.data || error.message);
      throw error;
    }
  },

  deleteFlashcard: async (id) => {
    try {
      const response = await axiosInstance.delete(`/flashcards/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete flashcard error:', error.response?.data || error.message);
      throw error;
    }
  },
};

export default api; 