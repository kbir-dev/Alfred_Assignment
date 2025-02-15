// src/components/ProgressTracker.jsx
import React from 'react';

const ProgressTracker = ({ flashcards }) => {
  const stats = {
    total: flashcards.length,
    mastered: flashcards.filter(card => card.box === 5).length,
    due: flashcards.filter(card => new Date(card.nextReview) <= new Date()).length,
  };

  return (
    <div className="p-6 bg-red-300 dark:bg-gray-800 rounded-lg shadow-lg border-4 border-black dark:border-gray-600">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white font-mono">Progress Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg border-2 border-black dark:border-gray-600">
          <div className="text-lg font-bold text-black dark:text-white">Total Cards</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg border-2 border-black dark:border-gray-600">
          <div className="text-lg font-bold text-black dark:text-white">Mastered</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.mastered}</div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg border-2 border-black dark:border-gray-600">
          <div className="text-lg font-bold text-black dark:text-white">Due for Review</div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.due}</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;