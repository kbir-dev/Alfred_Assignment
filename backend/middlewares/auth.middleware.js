const jwt = require("jsonwebtoken");
const User = require('../models/user.model');

exports.protect = async (req, res, next) => {
  try {
    // 1. Get token and check if it exists
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      console.log('No token found');
      return res.status(401).json({
        status: 'error',
        message: 'Not authorized to access this route'
      });
    }

    try {
      // 2. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // 3. Check if user still exists
      const currentUser = await User.findById(decoded.id);
      
      if (!currentUser) {
        console.log('User not found for token');
        return res.status(401).json({
          status: 'error',
          message: 'User not found'
        });
      }

      // 4. Attach user to request
      req.user = currentUser;
      next();
    } catch (error) {
      console.log('Token verification failed:', error.message);
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token'
      });
    }
  } catch (error) {
    console.log('Auth middleware error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Authentication error'
    });
  }
};