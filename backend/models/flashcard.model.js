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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Flashcard', FlashcardSchema);
