# Ramadan Spiritual Growth Tracker 🌙

A comprehensive web application to help Muslims track their spiritual activities during Ramadan and beyond.

![Ramadan Tracker](https://img.shields.io/badge/Ramadan-Tracker-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## Features ✨

### 🕌 Prayer Tracking
- Real-time prayer times based on location
- Next prayer countdown with glow effect
- Prayer completion tracking
- Qibla compass

### 📖 Quran & Islamic Content
- **Surah Al-Kahf** - Friday special with benefits and importance
- **Surah Al-Mulk** - Nightly recitation with protection benefits
- Full Surah reader with Arabic text and English translation
- Daily Ayah with rotation
- Daily Islamic quiz

### 🤲 Daily Activities
- **Daily Azkar** - Morning and evening remembrance tracker
- **Tasbeeh Counter** - Digital counter for 100 dhikr (33+33+34)
- Task completion system (Necessary & Extra tasks)
- Points and level system
- Streak tracking

### 📊 Progress Tracking
- Comprehensive statistics dashboard
- Activity history
- Leaderboard
- Achievement system
- Profile with detailed stats

### 🎨 Beautiful Islamic UI
- Deep emerald green and gold color scheme
- Islamic geometric patterns
- Smooth animations
- Responsive design
- Mobile-friendly

## Tech Stack 🛠️

### Frontend
- React 18
- React Router DOM
- Tailwind CSS v4
- Vite
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

### APIs
- Aladhan Islamic API (Prayer times, Islamic date)
- AlQuran Cloud API (Quran text and translations)

## Installation 🚀

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/talharabani/ramzan-tracker-.git
cd ramzan-tracker-
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

3. **Set up environment variables**

Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/ramadan-tracker
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

5. **Run the application**

Option 1 - Using the batch file (Windows):
```bash
start-dev.bat
```

Option 2 - Manual start:
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
npm run dev
```

6. **Open in browser**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Deployment 📦

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions to Vercel.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/talharabani/ramzan-tracker-)

## Project Structure 📁

```
ramzan-tracker/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
├── src/
│   ├── components/
│   │   ├── DailyAyah.jsx
│   │   ├── DailyAzkar.jsx
│   │   ├── DailyQuiz.jsx
│   │   ├── PrayerTimes.jsx
│   │   ├── SurahKahfCard.jsx
│   │   ├── SurahMulkCard.jsx
│   │   ├── SurahReader.jsx
│   │   ├── TasbeehCounter.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── IslamicDashboard.jsx
│   │   ├── Profile.jsx
│   │   ├── History.jsx
│   │   ├── Leaderboard.jsx
│   │   └── ...
│   ├── context/
│   ├── services/
│   ├── config/
│   └── main.jsx
├── public/
├── vercel.json
└── package.json
```

## Features in Detail 📝

### Surah Al-Kahf (Chapter 18)
- **When to Read**: Every Friday
- **Benefits**: 
  - Light between two Fridays
  - Protection from Dajjal (first 10 verses)
  - Forgiveness of sins
- **Features**: Friday detection, special badge, full reader

### Surah Al-Mulk (Chapter 67)
- **When to Read**: Every night before sleeping
- **Benefits**:
  - Protection from grave punishment
  - Intercession on Day of Judgment
  - Known as "The Savior"
- **Features**: Full reader with translation

### Task System
**Necessary Tasks** (7 tasks):
- 1 Supara reading
- 5 daily prayers
- Islamic video
- Surah Mulk
- 5 Ayat Tafseer
- Morning & Evening Azkar
- Pray on time (bonus)

**Extra Tasks** (7 tasks):
- 2 Supara reading
- 8 Taraweeh
- Tahajjud
- Tasbeeh 100
- Surah Kahf (Friday)
- Parents service
- Explain Hadith

## API Endpoints 🔌

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks/today` - Get today's activity
- `POST /api/tasks/toggle/:taskId` - Toggle task completion
- `POST /api/tasks/streak` - Update streak

### User
- `GET /api/users/leaderboard` - Get top users
- `GET /api/users/history/:days` - Get activity history
- `GET /api/users/monthly/:year/:month` - Get monthly summary

### Quizzes
- `GET /api/quizzes/daily` - Get daily quiz
- `POST /api/quizzes/submit` - Submit quiz answer

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments 🙏

- Aladhan API for Islamic prayer times
- AlQuran Cloud API for Quran text
- Islamic scholars for Hadith references
- The Muslim community for inspiration

## Support 💬

For support, email talharabani@example.com or open an issue in the repository.

## Roadmap 🗺️

- [ ] Audio recitation for Surahs
- [ ] Dua collection
- [ ] Ramadan calendar with Suhoor/Iftar times
- [ ] Social features and group challenges
- [ ] Mobile app (React Native)
- [ ] Offline mode
- [ ] Multiple language support

---

Made with ❤️ for the Muslim community

**May Allah accept our good deeds and make this tool beneficial for all Muslims. Ameen.** 🤲
