const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'],
    },
    box: {
      type: Number,
      default: 1, 
    },
    nextReviewDate: {
      type: Date,
      default: Date.now, 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  { timestamps: true }
);

// Add compound index for user-specific queries
FlashcardSchema.index({ user: 1, nextReviewDate: 1 });

module.exports = mongoose.model('Flashcard', FlashcardSchema);
