// routes/flashcards.js
const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashCardController');
const { protect } = require('../middlewares/auth.middleware');

// Apply protection middleware to all routes
router.use(protect);

// Routes
router.route('/')
  .get(flashcardController.getFlashcards)
  .post(flashcardController.createFlashcard);

router.route('/:id')
  .put(flashcardController.updateFlashcard)
  .delete(flashcardController.deleteFlashcard);

module.exports = router;
