// src/components/ReviewMode.jsx
import React, { useState, useEffect } from 'react';

const ReviewMode = ({ flashcards, onUpdateCard }) => {
  const [currentCard, setCurrentCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [dueCards, setDueCards] = useState([]);

  useEffect(() => {
    const now = new Date();
    const due = flashcards.filter(card => new Date(card.nextReviewDate) <= now);
    setDueCards(due);
    if (due.length > 0 && !currentCard) {
      setCurrentCard(due[0]);
    }
  }, [flashcards]);

  const handleResponse = async (correct) => {
    await onUpdateCard(currentCard._id, correct);
    setShowAnswer(false);
    const remainingCards = dueCards.filter(card => card._id !== currentCard._id);
    setDueCards(remainingCards);
    setCurrentCard(remainingCards[0] || null);
  };

  if (!currentCard) {
    return (
      <div className="text-center p-8 bg-purple-300 dark:bg-gray-800 rounded-lg shadow-lg border-4 border-black dark:border-gray-600">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
          No cards due for review! 🎉
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl p-8 bg-blue-300 dark:bg-gray-800 rounded-lg shadow-lg border-4 border-black dark:border-gray-600 mb-4">
        <div className="text-xl font-bold mb-4 text-black dark:text-white">
          {currentCard.question}
        </div>
        
        {showAnswer ? (
          <>
            <div className="text-lg mb-4 text-gray-800 dark:text-gray-200">
              {currentCard.answer}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleResponse(false)}
                className="flex-1 py-3 bg-red-500 text-white rounded-lg border-2 border-black hover:bg-red-600 transform hover:scale-105 transition-all"
              >
                Got it Wrong
              </button>
              <button
                onClick={() => handleResponse(true)}
                className="flex-1 py-3 bg-green-500 text-white rounded-lg border-2 border-black hover:bg-green-600 transform hover:scale-105 transition-all"
              >
                Got it Right
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => setShowAnswer(true)}
            className="w-full py-3 bg-yellow-500 text-white rounded-lg border-2 border-black hover:bg-yellow-600 transform hover:scale-105 transition-all"
          >
            Show Answer
          </button>
        )}
      </div>
      
      <div className="text-lg text-gray-600 dark:text-gray-300">
        Cards remaining: {dueCards.length}
      </div>
    </div>
  );
};

export default ReviewMode;