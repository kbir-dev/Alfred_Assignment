import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Award, Book, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { Loader2 } from 'lucide-react';
import StreakDisplay from './StreakDisplay';

const UserProfile = () => {
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        setLoading(true);
        const data = await api.getFlashcards();
        setFlashcards(data || []);
      } catch (err) {
        setError('Failed to load flashcards');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500 text-white p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  const stats = {
    totalCards: flashcards.length,
    dueCards: flashcards.filter(card => new Date(card.nextReviewDate) <= new Date()).length,
    averageBox: flashcards.length > 0 
      ? (flashcards.reduce((sum, card) => sum + card.box, 0) / flashcards.length).toFixed(1)
      : 0,
    progressPercentage: flashcards.length > 0
      ? (flashcards.reduce((sum, card) => sum + card.box, 0) / (flashcards.length * 5) * 100).toFixed(1)
      : 0
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/"
          className="inline-flex items-center text-white mb-8 hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="bg-blue-500 p-4 rounded-full">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user.username}</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>

        <StreakDisplay streak={user.streak} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard 
            icon={<Book className="w-6 h-6" />}
            title="Total Cards"
            value={stats.totalCards}
            color="blue"
          />
          <StatCard 
            icon={<Clock className="w-6 h-6" />}
            title="Due for Review"
            value={stats.dueCards}
            color="yellow"
          />
          <StatCard 
            icon={<Award className="w-6 h-6" />}
            title="Average Box"
            value={stats.averageBox}
            color="purple"
          />
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">Learning Progress</h3>
          <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
            <div 
              className="bg-blue-500 rounded-full h-4 transition-all duration-300"
              style={{ width: `${stats.progressPercentage}%` }}
            />
          </div>
          <p className="text-gray-400">
            Average progress: Box {stats.averageBox} out of 5 ({stats.progressPercentage}%)
          </p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <div className={`${colorClasses[color]} p-2 rounded-lg`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-white text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 