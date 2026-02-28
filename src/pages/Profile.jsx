import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';

const EnhancedProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [monthlyData, setMonthlyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const now = new Date();
      const [historyRes, monthlyRes] = await Promise.all([
        api.getHistory(90), // Last 90 days
        api.getMonthlySummary(now.getFullYear(), now.getMonth() + 1)
      ]);
      
      setHistory(historyRes.data);
      setMonthlyData(monthlyRes.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getProgressToNextLevel = () => {
    const pointsForNextLevel = user.currentLevel * 500;
    const currentLevelBase = (user.currentLevel - 1) * 500;
    const progress = ((user.totalPoints - currentLevelBase) / 500) * 100;
    return Math.min(progress, 100);
  };

  const achievements = [
    {
      name: 'First Steps',
      description: 'Complete your first task',
      icon: '👣',
      unlocked: user?.totalPoints > 0
    },
    {
      name: 'Dedicated Worshipper',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      unlocked: user?.streakCount >= 7
    },
    {
      name: 'Quran Lover',
      description: 'Read Quran 10 times',
      icon: '📖',
      unlocked: user?.quranReadCount >= 10
    },
    {
      name: 'Hadith Scholar',
      description: 'Explain 5 hadiths',
      icon: '📚',
      unlocked: user?.hadithExplainedCount >= 5
    },
    {
      name: 'Night Warrior',
      description: 'Pray Tahajjud 10 times',
      icon: '🌙',
      unlocked: user?.tahajjudCount >= 10
    },
    {
      name: 'Level Master',
      description: 'Reach level 10',
      icon: '🏆',
      unlocked: user?.currentLevel >= 10
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-islamic-beige">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-islamic-beige py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Card */}
        <div className="islamic-card mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-islamic-emerald to-islamic-gold flex items-center justify-center text-4xl font-bold text-white shadow-xl">
              {user?.fullName?.charAt(0).toUpperCase()}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-arabic font-bold text-islamic-navy mb-1">
                {user?.fullName}
              </h1>
              <p className="text-islamic-navy/70 mb-3">{user?.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 rounded-full bg-islamic-emerald/20 text-islamic-emerald text-sm font-medium">
                  Level {user?.currentLevel}
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
                  🔥 {user?.streakCount} Day Streak
                </span>
                <span className="px-3 py-1 rounded-full bg-islamic-gold/20 text-islamic-gold text-sm font-medium">
                  ⭐ {user?.totalPoints} Points
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors shadow-md"
            >
              Sign Out
            </button>
          </div>

          {/* Level Progress */}
          <div className="mt-6 p-4 bg-islamic-beige rounded-xl">
            <div className="flex justify-between text-sm text-islamic-navy/70 mb-2">
              <span>Level {user?.currentLevel}</span>
              <span>{500 - (user?.totalPoints % 500)} points to Level {user?.currentLevel + 1}</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-islamic-emerald to-islamic-gold transition-all duration-500"
                style={{ width: `${getProgressToNextLevel()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Islamic Activity Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="islamic-card bg-gradient-to-br from-islamic-emerald/5 to-islamic-gold/5 animate-slide-up">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">📖</span>
              <div>
                <p className="text-2xl font-bold text-islamic-emerald">{user?.quranReadCount || 0}</p>
                <p className="text-sm text-islamic-navy/70">Quran Read</p>
              </div>
            </div>
          </div>

          <div className="islamic-card bg-gradient-to-br from-purple-50 to-pink-50 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">📚</span>
              <div>
                <p className="text-2xl font-bold text-purple-600">{user?.hadithExplainedCount || 0}</p>
                <p className="text-sm text-islamic-navy/70">Hadith Explained</p>
              </div>
            </div>
          </div>

          <div className="islamic-card bg-gradient-to-br from-green-50 to-islamic-emerald/10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">⏰</span>
              <div>
                <p className="text-2xl font-bold text-green-600">{user?.totalPrayersOnTime || 0}</p>
                <p className="text-sm text-islamic-navy/70">Prayers On Time</p>
              </div>
            </div>
          </div>

          <div className="islamic-card bg-gradient-to-br from-islamic-gold/10 to-yellow-100 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🤲</span>
              <div>
                <p className="text-2xl font-bold text-islamic-gold">{user?.azkarCount || 0}</p>
                <p className="text-sm text-islamic-navy/70">Azkar Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ramadan Specific Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="islamic-card bg-gradient-to-br from-indigo-50 to-blue-50 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🌙</span>
              <div>
                <p className="text-2xl font-bold text-indigo-600">{user?.tahajjudCount || 0}</p>
                <p className="text-sm text-islamic-navy/70">Tahajjud Prayers</p>
              </div>
            </div>
          </div>

          <div className="islamic-card bg-gradient-to-br from-orange-50 to-red-50 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🕌</span>
              <div>
                <p className="text-2xl font-bold text-orange-600">{user?.taraweehCount || 0}</p>
                <p className="text-sm text-islamic-navy/70">Taraweeh Prayers</p>
              </div>
            </div>
          </div>

          <div className="islamic-card bg-gradient-to-br from-teal-50 to-cyan-50 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">📿</span>
              <div>
                <p className="text-2xl font-bold text-teal-600">{user?.tasbeehCount || 0}</p>
                <p className="text-sm text-islamic-navy/70">Tasbeeh Sessions</p>
              </div>
            </div>
          </div>

          <div className="islamic-card bg-gradient-to-br from-pink-50 to-rose-50 animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">❤️</span>
              <div>
                <p className="text-2xl font-bold text-pink-600">{user?.parentServiceCount || 0}</p>
                <p className="text-sm text-islamic-navy/70">Parent Services</p>
              </div>
            </div>
          </div>
        </div>

        {/* More Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="islamic-card">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>📿</span> Surah Statistics
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Surah Mulk</span>
                <span className="px-2 py-1 rounded-full bg-islamic-teal/20 text-islamic-teal text-sm font-bold">
                  {user?.surahMulkCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Surah Kahf</span>
                <span className="px-2 py-1 rounded-full bg-islamic-blue/20 text-islamic-blue text-sm font-bold">
                  {user?.surahKahfCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tafseer Sessions</span>
                <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-600 text-sm font-bold">
                  {user?.tafseerCount || 0}
                </span>
              </div>
            </div>
          </div>

          <div className="islamic-card">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>🌙</span> Night Worship
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tahajjud Prayers</span>
                <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold">
                  {user?.tahajjudCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completion Rate</span>
                <span className="text-sm font-bold text-green-600">
                  {monthlyData?.averageCompletion || 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="islamic-card">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>📊</span> This Month
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Days</span>
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-sm font-bold">
                  {monthlyData?.totalDays || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Points Earned</span>
                <span className="px-2 py-1 rounded-full bg-gold-100 text-gold-700 text-sm font-bold">
                  {monthlyData?.totalPoints || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* More Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="islamic-card">
            <h3 className="text-lg font-bold text-islamic-navy mb-3 flex items-center gap-2">
              <span>📿</span> Surah Statistics
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-islamic-navy/70">Surah Mulk</span>
                <span className="px-2 py-1 rounded-full bg-islamic-emerald/20 text-islamic-emerald text-sm font-bold">
                  {user?.surahMulkCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-islamic-navy/70">Surah Kahf</span>
                <span className="px-2 py-1 rounded-full bg-islamic-gold/20 text-islamic-gold text-sm font-bold">
                  {user?.surahKahfCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-islamic-navy/70">Tafseer Sessions</span>
                <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-600 text-sm font-bold">
                  {user?.tafseerCount || 0}
                </span>
              </div>
            </div>
          </div>

          <div className="islamic-card">
            <h3 className="text-lg font-bold text-islamic-navy mb-3 flex items-center gap-2">
              <span>🌙</span> Night Worship
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-islamic-navy/70">Tahajjud Prayers</span>
                <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold">
                  {user?.tahajjudCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-islamic-navy/70">Completion Rate</span>
                <span className="text-sm font-bold text-green-600">
                  {monthlyData?.averageCompletion || 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="islamic-card">
            <h3 className="text-lg font-bold text-islamic-navy mb-3 flex items-center gap-2">
              <span>📊</span> This Month
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-islamic-navy/70">Active Days</span>
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-sm font-bold">
                  {monthlyData?.totalDays || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-islamic-navy/70">Points Earned</span>
                <span className="px-2 py-1 rounded-full bg-islamic-gold/20 text-islamic-gold text-sm font-bold">
                  {monthlyData?.totalPoints || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="islamic-card mb-8">
          <h2 className="text-2xl font-arabic font-bold text-islamic-navy mb-4 flex items-center gap-2">
            <span>🏆</span> Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`text-center p-4 rounded-xl border-2 transition-all duration-300 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-islamic-gold/10 to-yellow-100 border-islamic-gold shadow-lg'
                    : 'bg-gray-100 border-gray-300 opacity-50 grayscale'
                }`}
                title={achievement.description}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <p className="text-xs font-bold text-islamic-navy">{achievement.name}</p>
                {achievement.unlocked && (
                  <span className="text-xs text-green-600">✓ Unlocked</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfile;
