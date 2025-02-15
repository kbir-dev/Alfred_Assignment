// controllers/flashcardController.js
const Flashcard = require('../models/flashcard.model');

// Create a new flashcard
exports.createFlashcard = async (req, res) => {
  try {
    const { question, answer } = req.body;
    
    // Always include the user ID from the authenticated request
    const newFlashcard = new Flashcard({
      question,
      answer,
      user: req.user._id  // This comes from the auth middleware
    });
    
    const savedFlashcard = await newFlashcard.save();
    res.status(201).json(savedFlashcard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get flashcards - only return user's own cards
exports.getFlashcards = async (req, res) => {
  try {
    console.log('Fetching flashcards for user:', req.user._id);
    const flashcards = await Flashcard.find({ user: req.user._id });
    console.log(`Found ${flashcards.length} flashcards`);
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update flashcard - only if it belongs to user
exports.updateFlashcard = async (req, res) => {
  try {
    const { correct } = req.body;
    const flashcard = await Flashcard.findOne({
      _id: req.params.id,
      user: req.user._id  // Ensure the flashcard belongs to the user
    });

    if (!flashcard) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Flashcard not found or unauthorized'
      });
    }

    // Update streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastReview = req.user.streak.lastReviewDate ? new Date(req.user.streak.lastReviewDate) : null;
    if (lastReview) {
      lastReview.setHours(0, 0, 0, 0);
      
      const daysDifference = Math.floor((today - lastReview) / (1000 * 60 * 60 * 24));
      
      if (daysDifference === 1) {
        // Next consecutive day, increase streak
        req.user.streak.count += 1;
      } else if (daysDifference > 1) {
        // Streak broken
        req.user.streak.count = 1;
      }
      // If same day, don't change streak
    } else {
      // First review ever
      req.user.streak.count = 1;
    }
    
    req.user.streak.lastReviewDate = new Date();
    await req.user.save();

    if (correct) {
      // Move flashcard to the next box
      flashcard.box += 1;
      
      // Define review intervals for each box
      let daysToAdd = 1; // Default for Box 1
      if (flashcard.box === 2) daysToAdd = 3;      // 3 days
      else if (flashcard.box === 3) daysToAdd = 7;  // 1 week
      else if (flashcard.box === 4) daysToAdd = 14; // 2 weeks
      else if (flashcard.box >= 5) daysToAdd = 30;  // 1 month
      
      flashcard.nextReviewDate = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000);
    } else {
      // Reset flashcard to Box 1 if answered incorrectly
      flashcard.box = 1;
      flashcard.nextReviewDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 1 day
    }

    const updatedFlashcard = await flashcard.save();
    res.status(200).json({
      flashcard: updatedFlashcard,
      streak: req.user.streak
    });
    console.log("Flashcard updated successfully")
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete flashcard - only if it belongs to user
exports.deleteFlashcard = async (req, res) => {
  try {
    const deletedFlashcard = await Flashcard.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id  // Ensure the flashcard belongs to the user
    });

    if (!deletedFlashcard) {
      return res.status(404).json({
        status: 'error',
        message: 'Flashcard not found or unauthorized'
      });
    }
    res.status(200).json({ message: 'Flashcard deleted successfully' });
    console.log("Flashcard deleted successfully")
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
