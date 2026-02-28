import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getTodayActivity,
  toggleTask,
  getActivityByDate,
  getMonthlySummary,
  updateStreak
} from '../controllers/taskController.js';

const router = express.Router();

router.use(protect);

router.get('/today', getTodayActivity);
router.post('/toggle', toggleTask);
router.get('/date/:date', getActivityByDate);
router.get('/monthly/:year/:month', getMonthlySummary);
router.post('/streak', updateStreak);

export default router;
