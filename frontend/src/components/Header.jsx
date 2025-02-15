import React from 'react';
import { Sun, Moon } from 'lucide-react';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-pink-500 to-purple-500 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg transform hover:scale-[1.01] transition-transform">
        <h1 className="text-4xl font-bold text-white font-mono">
          Alfred Flashcard Learning App
        </h1>
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-lg bg-white dark:bg-gray-800 hover:scale-110 transition-transform"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-500" />
          ) : (
            <Moon className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;