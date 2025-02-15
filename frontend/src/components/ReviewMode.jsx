// src/components/ReviewMode.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RotateCcw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ReviewMode = ({ flashcards, onUpdateCard }) => {
  const { updateUserStreak } = useAuth();
  const [currentCard, setCurrentCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [dueCards, setDueCards] = useState([]);
  const [direction, setDirection] = useState(0);
  const [exitX, setExitX] = useState(0);

  useEffect(() => {
    const now = new Date();
    const due = flashcards.filter(card => new Date(card.nextReviewDate) <= now);
    setDueCards(due);
    if (due.length > 0 && !currentCard) {
      setCurrentCard(due[0]);
    }
  }, [flashcards]);

  const handleResponse = async (correct) => {
    setExitX(correct ? 100 : -100);
    try {
      const response = await onUpdateCard(currentCard._id, correct);
      if (response?.streak) {
        updateUserStreak(response.streak);
      }
      setShowAnswer(false);
      const remainingCards = dueCards.filter(card => card._id !== currentCard._id);
      setDueCards(remainingCards);
      setCurrentCard(remainingCards[0] || null);
    } catch (err) {
      console.error('Error updating card:', err);
    }
  };

  if (!currentCard) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-600"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-4"
        >
          <RotateCcw className="w-16 h-16 text-blue-500" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          No cards due for review! 🎉
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Come back later when you have cards to review
        </p>
      </motion.div>
    );
  }

  const cardVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      x: exitX,
      opacity: 0,
      scale: 0.5,
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard._id}
            className="w-full"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={direction}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
          >
            <div className="w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-2 border-gray-200 dark:border-gray-600 mb-4">
              <div className="min-h-[120px] relative mb-6">
                <AnimatePresence mode="wait">
                  {!showAnswer ? (
                    <motion.div
                      key="question"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute w-full"
                    >
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {currentCard.question}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute w-full"
                    >
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {currentCard.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-6">
                {showAnswer ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex space-x-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleResponse(false)}
                      className="flex-1 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <X className="w-5 h-5" />
                      <span>Got it Wrong</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleResponse(true)}
                      className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Check className="w-5 h-5" />
                      <span>Got it Right</span>
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAnswer(true)}
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Show Answer
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-lg text-gray-600 dark:text-gray-300"
      >
        Cards remaining: {dueCards.length}
      </motion.div>
    </div>
  );
};

export default ReviewMode;