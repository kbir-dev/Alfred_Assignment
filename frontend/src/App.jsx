// src/App.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import FlashcardCreation from './components/FlashcardCreation';
import FlashcardList from './components/FlashcardList';
import ReviewMode from './components/ReviewMode';
import ProgressTracker from './components/ProgressTracker';
import api from './services/api';
import { Loader2 } from 'lucide-react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      setLoading(true);
      const data = await api.getFlashcards();
      setFlashcards(data);
    } catch (err) {
      setError('Failed to load flashcards');
      console.error(err);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
            <FlashcardList 
              flashcards={flashcards} 
              onDelete={deleteFlashcard}
            />
            <ProgressTracker flashcards={flashcards} />
          </>
        ) : (
          <ReviewMode 
            flashcards={flashcards} 
            setFlashcards={setFlashcards}
            onUpdateCard={async (id, correct) => {
              try {
                const updatedCard = await api.updateFlashcard(id, { correct });
                setFlashcards(flashcards.map(card => 
                  card._id === id ? updatedCard : card
                ));
              } catch (err) {
                setError('Failed to update flashcard');
                console.error(err);
              }
            }}
          />
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

export default App;