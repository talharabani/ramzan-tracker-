import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number,
    required: true
  },
  explanation: {
    type: String
  },
  category: {
    type: String,
    enum: ['Quran', 'Hadith', 'Fiqh', 'History', 'General'],
    default: 'General'
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

quizSchema.index({ date: 1 });

export default mongoose.model('Quiz', quizSchema);
