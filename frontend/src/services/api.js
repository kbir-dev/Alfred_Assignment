import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Configure axios defaults
axios.defaults.baseURL = API_URL;

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
    const response = await axios.post('/auth/login', { email, password });
    return response.data;
  },

  signup: async (username, email, password) => {
    const response = await axios.post('/auth/signup', { username, email, password });
    return response.data;
  },

  verifyToken: async (token) => {
    api.setAuthToken(token);
    const response = await axios.get('/auth/verify');
    return response.data;
  },

  // Flashcard endpoints
  getFlashcards: async () => {
    const response = await axios.get('/flashcards');
    return response.data;
  },

  createFlashcard: async (flashcard) => {
    const response = await axios.post('/flashcards', flashcard);
    return response.data;
  },

  updateFlashcard: async (id, data) => {
    const response = await axios.put(`/flashcards/${id}`, data);
    return response.data;
  },

  deleteFlashcard: async (id) => {
    const response = await axios.delete(`/flashcards/${id}`);
    return response.data;
  },
};

export default api; 