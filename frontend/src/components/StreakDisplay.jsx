import React from 'react';
import { Flame } from 'lucide-react';

const StreakDisplay = ({ streak = { count: 0, lastReviewDate: null } }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-orange-500 p-3 rounded-full">
          <Flame className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Daily Streak</h3>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl font-bold text-orange-500 mb-2">
            {streak?.count || 0}
          </div>
          <div className="text-gray-400">
            {(streak?.count || 0) === 1 ? 'Day' : 'Days'}
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-gray-400">
        {streak?.count > 0 ? (
          <>
            <p className="mb-2">🔥 Keep up the great work!</p>
            <p>Last review: {streak.lastReviewDate ? new Date(streak.lastReviewDate).toLocaleDateString() : 'No reviews yet'}</p>
          </>
        ) : (
          <p>Start your streak by reviewing cards today!</p>
        )}
      </div>
    </div>
  );
};

export default StreakDisplay; 