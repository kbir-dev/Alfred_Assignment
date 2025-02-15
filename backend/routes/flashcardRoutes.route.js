// routes/flashcards.js
const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashCardController');

router.post('/', flashcardController.createFlashcard);

router.get('/', flashcardController.getFlashcards);

router.put('/:id', flashcardController.updateFlashcard);

router.delete('/:id', flashcardController.deleteFlashcard);

module.exports = router;
