const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL (Vite default port)
  credentials: true
}));

app.use(express.json());

// ... rest of your middleware and routes 