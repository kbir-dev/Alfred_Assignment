const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB = require('./db/database')
const cors = require('cors');
const flashcardRoutes = require('./routes/flashcardRoutes.route')
const authRoutes = require('./routes/auth.route')
const { protect } = require('./middlewares/auth.middleware')
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')

dotenv.config()

const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

// Security middleware for production
if (NODE_ENV === 'production') {
  app.use(helmet())
  app.use(compression())
}

// CORS configuration
app.use(cors({
  origin: [
    'https://alfredlearningplatform.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true
}));

app.use(express.json());

// Add this before your routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes with /api prefix
app.use('/api/auth', authRoutes);
app.use('/api/flashcards', protect, flashcardRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Add this after your routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Connect to database before starting server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();