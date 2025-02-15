import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = {
  // Get all flashcards
  getFlashcards: async () => {
    const response = await axios.get(`${API_URL}/flashcards`);
    return response.data;
  },

  // Create a new flashcard
  createFlashcard: async (flashcard) => {
    const response = await axios.post(`${API_URL}/flashcards`, flashcard);
    return response.data;
  },

  // Update a flashcard
  updateFlashcard: async (id, data) => {
    const response = await axios.put(`${API_URL}/flashcards/${id}`, data);
    return response.data;
  },

  // Delete a flashcard
  deleteFlashcard: async (id) => {
    const response = await axios.delete(`${API_URL}/flashcards/${id}`);
    return response.data;
  },
};

export default api; 