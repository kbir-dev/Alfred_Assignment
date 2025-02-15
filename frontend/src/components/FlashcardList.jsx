// src/components/FlashcardList.jsx
import React from 'react';
import { Trash2 } from 'lucide-react';

const FlashcardList = ({ flashcards, onDelete }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white font-mono">Your Flashcards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcards.map((flashcard) => (
          <div
            key={flashcard._id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-600 transform hover:scale-105 transition-transform"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-semibold mb-2 text-gray-900 dark:text-white">
                  Question: {flashcard.question}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  Answer: {flashcard.answer}
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Box: {flashcard.box}
                </div>
              </div>
              <button
                onClick={() => onDelete(flashcard._id)}
                className="p-2 text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardList;