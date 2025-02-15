// controllers/flashcardController.js
const Flashcard = require('../models/flashcard.model');

// Create a new flashcard
exports.createFlashcard = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFlashcard = new Flashcard({ question, answer });
    const savedFlashcard = await newFlashcard.save();
    res.status(201).json(savedFlashcard);
    console.log("Flashcard created successfully")
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all flashcards
exports.getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.status(200).json(flashcards);
    console.log("Flashcards fetched successfully")
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a flashcard using Leitner System logic
// Expects request body to have { correct: true/false }
exports.updateFlashcard = async (req, res) => {
  try {
    const { correct } = req.body;
    const flashcard = await Flashcard.findById(req.params.id);

    if (!flashcard) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    if (correct) {
      // Move flashcard to the next box
      flashcard.box += 1;
      
      // Define review intervals for each box
      let daysToAdd = 1; // Default for Box 1
      if (flashcard.box === 2) daysToAdd = 3;
      else if (flashcard.box === 3) daysToAdd = 7;
      else if (flashcard.box === 4) daysToAdd = 14;
      else if (flashcard.box >= 5) daysToAdd = 30;
      
      flashcard.nextReviewDate = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000);
    } else {
      // Reset flashcard to Box 1 if answered incorrectly
      flashcard.box = 1;
      flashcard.nextReviewDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    }

    const updatedFlashcard = await flashcard.save();
    res.status(200).json(updatedFlashcard);
    console.log("Flashcard updated successfully")
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a flashcard
exports.deleteFlashcard = async (req, res) => {
  try {
    const deletedFlashcard = await Flashcard.findByIdAndDelete(req.params.id);
    if (!deletedFlashcard) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }
    res.status(200).json({ message: 'Flashcard deleted successfully' });
    console.log("Flashcard deleted successfully")
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
