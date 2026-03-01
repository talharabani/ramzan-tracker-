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

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ramadan-tracker')
  .then(() => {
    console.log('✅ MongoDB Connected');
    seedQuizzes(); // Seed default quizzes
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    console.error('Error details:', err.message);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/islamic', islamicRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});