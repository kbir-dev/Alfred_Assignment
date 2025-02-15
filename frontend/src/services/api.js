import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Configure axios defaults
const api = {
  setAuthToken: (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  },

  // Auth endpoints
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
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
      const response = await axios.post(`${API_URL}/auth/signup`, { username, email, password });
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
      const response = await axios.get(`${API_URL}/auth/verify`);
      return response.data;
    } catch (error) {
      console.error('Token verification error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Flashcard endpoints
  getFlashcards: async () => {
    try {
      const response = await axios.get(`${API_URL}/flashcards`);
      return response.data;
    } catch (error) {
      console.error('Get flashcards error:', error.response?.data || error.message);
      throw error;
    }
  },

  createFlashcard: async (flashcard) => {
    try {
      const response = await axios.post(`${API_URL}/flashcards`, flashcard);
      return response.data;
    } catch (error) {
      console.error('Create flashcard error:', error.response?.data || error.message);
      throw error;
    }
  },

  updateFlashcard: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/flashcards/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Update flashcard error:', error.response?.data || error.message);
      throw error;
    }
  },

  deleteFlashcard: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/flashcards/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete flashcard error:', error.response?.data || error.message);
      throw error;
    }
  },
};

// Set default base URL
axios.defaults.baseURL = API_URL;

export default api; 