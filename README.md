# Alfred Learning Platform

[![Made with React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Powered by Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A modern flashcard learning application built with the MERN stack, featuring spaced repetition and streak tracking to enhance learning efficiency.

[Live Demo](https://alfredlearningplatform.vercel.app)

## Features

- 🔐 Secure User Authentication
- 📝 Personal Flashcard Creation & Management
- 📚 Spaced Repetition Learning System
- 🔥 Daily Study Streak Tracking
- 📊 Learning Progress Monitoring
- 🌓 Dark Mode Interface
- 📱 Responsive Design

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Bcrypt
- CORS

## Local Development Setup

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- Git

### Backend Setup

1. Clone and navigate to the project
```bash
git clone https://github.com/yourusername/alfred-learning-platform.git
cd alfred-learning-platform/backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```env
PORT=3000
MONGO_DB_URL="your_mongodb_connection_string"
JWT_SECRET="your_secret_key"
FRONTEND_URL="http://localhost:5173"
```

4. Start the server
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory
```bash
cd ../frontend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.development`
```env
VITE_API_URL=http://localhost:3000/api
```

4. Start development server
```bash
npm run dev
```

## Deployment

### Backend (Render)

1. Create new Web Service on Render
2. Configure build settings:
   - Build Command: `npm install`
   - Start Command: `node app.js`
3. Add environment variables:
```env
PORT=3000
MONGO_DB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://alfredlearningplatform.vercel.app
NODE_ENV=production
CORS_ORIGIN=https://alfredlearningplatform.vercel.app
```

### Frontend (Vercel)

1. Configure build settings in `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "https://alfred-flashcard-learning.onrender.com" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,DELETE,PATCH,POST,PUT" },
        { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

2. Set environment variable in `.env.production`:
```env
VITE_API_URL=https://alfred-flashcard-learning.onrender.com/api
```

## Learning System

### Spaced Repetition (Leitner System)

The application implements the Leitner System with five boxes:
- Box 1: Review daily
- Box 2: Review every 3 days
- Box 3: Review weekly
- Box 4: Review bi-weekly
- Box 5: Review monthly

Cards move between boxes based on your performance:
- Correct answer: Card moves to next box
- Incorrect answer: Card returns to Box 1

### Streak System
- Daily study streaks track consistent learning
- Streak increases with consecutive days of study
- Missing a day resets the streak
- Visual feedback encourages regular practice

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Create new account
- POST `/api/auth/login` - User login
- GET `/api/auth/verify` - Verify JWT token

### Flashcards
- GET `/api/flashcards` - Get user's flashcards
- POST `/api/flashcards` - Create new flashcard
- PUT `/api/flashcards/:id` - Update flashcard
- DELETE `/api/flashcards/:id` - Delete flashcard

## Project Structure
```
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── app.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── services/
    │   └── App.jsx
    ├── index.html
    └── package.json
```

## Security Features
- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Helmet security headers
- Rate limiting
- User-specific data isolation


- Inspired by the Leitner System

