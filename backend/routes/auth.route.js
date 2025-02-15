const express = require("express");
const router = express.Router();
const { signup, login, getProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/auth.middleware");

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.get("/verify", protect, (req, res) => {
  res.json({
    status: 'success',
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    }
  });
});

module.exports = router;
