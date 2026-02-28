import express from 'express';
import { protect } from '../middleware/auth.js';
import { getProfile, getLeaderboard, getHistory } from '../controllers/userController.js';

const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);
router.get('/leaderboard', getLeaderboard);
router.get('/history', getHistory);

export default router;
