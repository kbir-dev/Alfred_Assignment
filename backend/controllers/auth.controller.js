const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Email or password is incorrect'
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 'error',
        message: 'Email or password is incorrect'
      });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({
      status: 'success',
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        streak: user.streak
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again later.'
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        status: 'error',
        message: 'This email is already registered'
      });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        status: 'error',
        message: 'This username is already taken'
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      streak: { count: 0, lastReviewDate: null }
    });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      status: 'success',
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        streak: user.streak
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again later.'
    });
  }
};

exports.verifyToken = async (req, res) => {
  // ... token verification logic
}; 