import axios from 'axios';

// Production backend URL (Render)
const PRODUCTION_API_URL = 'https://ramzan-tracker.onrender.com';

// Development backend URL (local)
const DEVELOPMENT_API_URL = 'http://localhost:5000';

// Determine API URL based on environment
// In Vite: import.meta.env.MODE is 'production' or 'development'
// In production (Vercel), use Render backend
// In development (localhost), use local backend or Render (your choice)
const API_URL = import.meta.env.MODE === 'production' 
  ? PRODUCTION_API_URL 
  : PRODUCTION_API_URL; // Change to DEVELOPMENT_API_URL if running backend locally

console.log('🌐 API Configuration:');
console.log('- Mode:', import.meta.env.MODE);
console.log('- API URL:', API_URL);

// Set axios defaults
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add request interceptor for debugging
axios.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axios.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

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
