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
  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
  }));
  app.use(compression())
}

// CORS configuration with more options
app.use(cors({
  origin: ['https://alfredlearningplatform.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  // Log headers in development
  if (NODE_ENV === 'development') {
    console.log('Headers:', req.headers);
  }
  next();
});

// Routes with /api prefix
app.use('/api/auth', authRoutes);
app.use('/api/flashcards', protect, flashcardRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong!',
    error: NODE_ENV === 'development' ? err : undefined
  });
});

// Connect to database before starting server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();