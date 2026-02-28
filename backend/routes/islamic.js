import express from 'express';
import {
  getTodayContent,
  getDailyAyah,
  getDailyHadith,
  getSurahMulk,
  getSurahKahf,
  getSurah,
  getRandomAyahs,
  getPrayerTimes,
  markPrayerCompleted,
  updateLocationPreferences,
  getIslamicDate,
  checkSpecialDay
} from '../controllers/islamicController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Daily Content Routes
router.get('/today', getTodayContent);
router.get('/ayah/daily', getDailyAyah);
router.get('/hadith/daily', getDailyHadith);

// Quran Routes
router.get('/surah/mulk', getSurahMulk);
router.get('/surah/kahf', getSurahKahf);
router.get('/surah/:surahNumber', getSurah);
router.get('/ayah/random', getRandomAyahs);

// Prayer Times Routes
router.get('/prayer-times', getPrayerTimes);
router.post('/prayer-times/complete', markPrayerCompleted);

// Islamic Date Routes
router.get('/date', getIslamicDate);
router.get('/special-day', checkSpecialDay);

// User Preferences Routes
router.put('/preferences', updateLocationPreferences);

export default router;
