import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getDailyQuiz,
  submitQuizAnswer,
  getQuizHistory
} from '../controllers/quizController.js';

const router = express.Router();

router.use(protect);

router.get('/daily', getDailyQuiz);
router.post('/submit', submitQuizAnswer);
router.get('/history', getQuizHistory);

export default router;
