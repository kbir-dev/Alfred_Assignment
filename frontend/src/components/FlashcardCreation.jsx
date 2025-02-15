// src/components/FlashcardCreation.jsx
import React, { useState } from 'react';

const FlashcardCreation = ({ onAdd }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      onAdd({ question, answer });
      setQuestion('');
      setAnswer('');
    }
  };

  return (
    <div className="mb-8 p-6 bg-yellow-300 dark:bg-gray-800 rounded-lg shadow-lg border-4 border-black dark:border-gray-600">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white font-mono">Create New Flashcard</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold mb-2 text-black dark:text-white">
            Question:
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2 text-black dark:text-white">
            Answer:
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg border-2 border-black dark:border-gray-600 hover:bg-blue-600 transform hover:scale-105 transition-all"
        >
          Add Flashcard
        </button>
      </form>
    </div>
  );
};

export default FlashcardCreation;