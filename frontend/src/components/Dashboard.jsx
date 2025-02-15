import React, { useState, useEffect } from 'react';
import Header from './Header';
import FlashcardCreation from './FlashcardCreation';
import FlashcardList from './FlashcardList';
import ReviewMode from './ReviewMode';
import ProgressTracker from './ProgressTracker';
import api from '../services/api';
import { Loader2, Book } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [flashcards, setFlashcards] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') !== 'false'; // Default to true
    setDarkMode(savedDarkMode);
    document.documentElement.classList.add('dark'); // Add dark class by default
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      setLoading(true);
      const data = await api.getFlashcards();
      setFlashcards(data || []); // Ensure we always have an array
    } catch (err) {
      if (err.response?.status === 404) {
        setFlashcards([]); // Set empty array for new users
      } else {
        setError('Failed to load flashcards');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addFlashcard = async (flashcard) => {
    try {
      const newCard = await api.createFlashcard(flashcard);
      setFlashcards([...flashcards, newCard]);
    } catch (err) {
      setError('Failed to create flashcard');
      console.error(err);
    }
  };

  const deleteFlashcard = async (id) => {
    try {
      await api.deleteFlashcard(id);
      setFlashcards(flashcards.filter(card => card._id !== id));
    } catch (err) {
      setError('Failed to delete flashcard');
      console.error(err);
    }
  };

  const toggleReviewMode = () => {
    setReviewMode(!reviewMode);
  };

  const handleLogout = () => {
    logout();
  };

  const EmptyState = () => (
    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-600">
      <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Flashcards Yet</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Create your first flashcard to start learning!</p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark:bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {!reviewMode ? (
          <>
            <FlashcardCreation onAdd={addFlashcard} />
            {flashcards.length === 0 ? (
              <EmptyState />
            ) : (
              <FlashcardList 
                flashcards={flashcards} 
                onDelete={deleteFlashcard}
              />
            )}
          </>
        ) : (
          <>
            <ProgressTracker flashcards={flashcards} />
            <ReviewMode 
              flashcards={flashcards} 
              setFlashcards={setFlashcards}
              onUpdateCard={async (id, correct) => {
                try {
                  const response = await api.updateFlashcard(id, { correct });
                  setFlashcards(flashcards.map(card => 
                    card._id === id ? response.flashcard : card
                  ));
                  return response; // Return the full response for streak handling
                } catch (err) {
                  setError('Failed to update flashcard');
                  console.error(err);
                }
              }}
            />
          </>
        )}
        
        <button
          onClick={toggleReviewMode}
          className="fixed bottom-8 right-8 px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all"
        >
          {reviewMode ? 'Exit Review' : 'Start Review'}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;