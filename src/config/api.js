import axios from 'axios';

// Always use Render backend (deployed on Render)
// Change to 'http://localhost:5000' if running backend locally
const API_URL = 'https://ramzan-tracker.onrender.com';

axios.defaults.baseURL = API_URL;

export const api = {
  // Auth
  register: (data) => axios.post('/api/auth/register', data),
  login: (data) => axios.post('/api/auth/login', data),

  // Tasks
  getTodayActivity: () => axios.get('/api/tasks/today'),
  toggleTask: (taskId) => axios.post('/api/tasks/toggle', { taskId }),
  getActivityByDate: (date) => axios.get(`/api/tasks/date/${date}`),
  getMonthlySummary: (year, month) => axios.get(`/api/tasks/monthly/${year}/${month}`),
  updateStreak: () => axios.post('/api/tasks/streak'),

  // User
  getProfile: () => axios.get('/api/user/profile'),
  getLeaderboard: () => axios.get('/api/user/leaderboard'),
  getHistory: (limit) => axios.get(`/api/user/history?limit=${limit}`),

  // Quizzes
  getDailyQuiz: () => axios.get('/api/quizzes/daily'),
  submitQuizAnswer: (data) => axios.post('/api/quizzes/submit', data),
  getQuizHistory: () => axios.get('/api/quizzes/history'),

  // Islamic API
  getTodayContent: () => axios.get('/api/islamic/today'),
  getDailyAyah: () => axios.get('/api/islamic/ayah/daily'),
  getDailyHadith: () => axios.get('/api/islamic/hadith/daily'),
  getSurahMulk: () => axios.get('/api/islamic/surah/mulk'),
  getSurahKahf: () => axios.get('/api/islamic/surah/kahf'),
  getSurah: (number) => axios.get(`/api/islamic/surah/${number}`),
  getRandomAyahs: (count) => axios.get(`/api/islamic/ayah/random?count=${count}`),
  getPrayerTimes: (params) => axios.get('/api/islamic/prayer-times', { params }),
  markPrayerCompleted: (data) => axios.post('/api/islamic/prayer-times/complete', data),
  getIslamicDate: () => axios.get('/api/islamic/date'),
  checkSpecialDay: () => axios.get('/api/islamic/special-day'),
  updateLocationPreferences: (data) => axios.put('/api/islamic/preferences', data)
};

export default api;
