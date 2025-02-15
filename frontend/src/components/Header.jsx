import React from 'react';
import { Sun, Moon, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full mb-8">
      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-pink-500 to-purple-500 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg transform hover:scale-[1.01] transition-transform">
        <div className="flex items-center space-x-4">
          <h1 className="text-4xl font-bold text-white font-mono">
            Alfred Flashcard Learning App
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span>{user.username}</span>
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          )}
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
      </div>
    </header>
  );
};

export default Header;