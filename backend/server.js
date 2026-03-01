// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/user.js';
import quizRoutes from './routes/quizzes.js';
import islamicRoutes from './routes/islamic.js';
import { seedQuizzes } from './controllers/quizController.js';

// Load environment variables
dotenv.config();

const app = express();

// CORS Configuration - Allow Vercel frontend
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://ramzan-tracker.vercel.app',
    'https://ramzan-tracker-*.vercel.app', // Allow all Vercel preview deployments
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Environment Variables Check
console.log('🔍 Environment Check:');
console.log('- PORT:', process.env.PORT || 5000);
console.log('- NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Missing');
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');

// Critical: Check for required environment variables
if (!process.env.JWT_SECRET) {
  console.error('❌ CRITICAL: JWT_SECRET is not set!');
  console.error('Please set JWT_SECRET in Render environment variables');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error('❌ CRITICAL: MONGODB_URI is not set!');
  console.error('Please set MONGODB_URI in Render environment variables');
  process.exit(1);
}

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    seedQuizzes(); // Seed default quizzes
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    console.error('Error details:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/islamic', islamicRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    environment: process.env.NODE_ENV || 'development',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Unhandled Error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});