import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import { TASKS } from '../config/tasks';
import TaskCard from '../components/TaskCard';
import DailyQuiz from '../components/DailyQuiz';
import EnhancedPrayerTimes from '../components/PrayerTimes';
import QiblaCompass from '../components/QiblaCompass';
import DailyAyah from '../components/DailyAyah';
import DailyHadith from '../components/DailyHadith';
import SurahViewer from '../components/SurahViewer';

const EnhancedDashboard = () => {
  const { user, updateUser } = useAuth();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [islamicContent, setIslamicContent] = useState(null);
  const [isFriday, setIsFriday] = useState(false);
  const [showSurahViewer, setShowSurahViewer] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [activityRes, contentRes, specialDayRes] = await Promise.all([
        api.getTodayActivity(),
        api.getTodayContent(),
        api.checkSpecialDay()
      ]);
      
      setActivity(activityRes.data);
      setIslamicContent(contentRes.data.data);
      setIsFriday(specialDayRes.data.data.isFriday);
      
      await updateStreakOnLoad();
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStreakOnLoad = async () => {
    try {
      const { data } = await api.updateStreak();
      updateUser({ streakCount: data.streakCount });
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      // Check if it's a Surah task
      if (taskId === 'surah_mulk') {
        setShowSurahViewer('mulk');
        return;
      }
      if (taskId === 'surah_kahf') {
        setShowSurahViewer('kahf');
        return;
      }
      
      const { data } = await api.toggleTask(taskId);
      setActivity(data.activity);
      updateUser(data.user);
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleSurahComplete = async (surahType) => {
    const taskId = surahType === 'mulk' ? 'surah_mulk' : 'surah_kahf';
    setShowSurahViewer(null);
    
    try {
      const { data } = await api.toggleTask(taskId);
      setActivity(data.activity);
      updateUser(data.user);
    } catch (error) {
      console.error('Error completing surah:', error);
    }
  };

  const isTaskCompleted = (taskId) => {
    return activity?.tasksCompleted?.some(t => t.taskId === taskId) || false;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-islamic-teal border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen calligraphy-bg geometric-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Ramadan Greeting Header */}
        <div className="mb-8 animate-fade-in text-center">
          <div className="inline-block mb-4">
            <span className="text-6xl">🌙</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-arabic font-bold text-transparent bg-clip-text bg-gradient-to-r from-islamic-teal to-islamic-blue mb-2">
            Ramadan Mubarak!
          </h1>
          <h2 className="text-3xl md:text-4xl font-arabic font-bold text-gray-800 mb-2">
            As-salamu alaykum, {user?.fullName?.split(' ')[0]}! 🌟
          </h2>
          <p className="text-lg text-gray-600 font-elegant">
            May Allah bless your day with peace, productivity, and spiritual growth
          </p>
          {islamicContent?.islamicDate && (
            <p className="text-sm text-islamic-teal font-arabic mt-2">
              {islamicContent.islamicDate.formatted}
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="islamic-card animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center text-2xl shadow-lg animate-pulse-glow">
                ⭐
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Points</p>
                <p className="text-3xl font-bold text-islamic-gold">{user?.totalPoints || 0}</p>
              </div>
            </div>
          </div>

          <div className="islamic-card animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-islamic-teal to-islamic-blue flex items-center justify-center text-2xl shadow-lg">
                🎯
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Current Level</p>
                <p className="text-3xl font-bold text-islamic-teal">{user?.currentLevel || 1}</p>
              </div>
            </div>
          </div>

          <div className="islamic-card animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-2xl shadow-lg">
                🔥
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Streak Days</p>
                <p className="text-3xl font-bold text-orange-600">{user?.streakCount || 0}</p>
              </div>
            </div>
          </div>

          <div className="islamic-card animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-islamic-blue to-purple-500 flex items-center justify-center text-2xl shadow-lg">
                📊
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Today's Progress</p>
                <p className="text-3xl font-bold text-islamic-blue">{activity?.completionPercentage || 0}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Prayer Times & Qibla */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <EnhancedPrayerTimes />
          </div>
          <div className="space-y-6">
            <QiblaCompass />
          </div>
        </div>

        {/* Daily Ayah & Hadith */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DailyAyah />
          <DailyHadith />
        </div>

        {/* Friday Special - Surah Kahf Reminder */}
        {isFriday && (
          <div className="mb-8 islamic-card bg-gradient-to-r from-green-50 to-islamic-teal/10 border-2 border-green-400 animate-pulse-glow">
            <div className="flex items-center gap-4">
              <span className="text-5xl">📜</span>
              <div className="flex-1">
                <p className="text-xl font-bold text-green-700 mb-1 font-arabic">
                  🕌 It's Friday - Blessed Day!
                </p>
                <p className="text-gray-700 mb-3">
                  Don't forget to recite Surah Al-Kahf today! Those who recite it will have light between the two Fridays.
                </p>
                <button
                  onClick={() => handleToggleTask('surah_kahf')}
                  className={`islamic-button text-sm ${isTaskCompleted('surah_kahf') ? 'opacity-50' : ''}`}
                  disabled={isTaskCompleted('surah_kahf')}
                >
                  {isTaskCompleted('surah_kahf') ? '✓ Completed' : '📖 Read Surah Kahf Now'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Daily Quiz */}
        <div className="mb-8">
          <DailyQuiz />
        </div>

        {/* Tasks Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-arabic font-bold text-islamic-teal flex items-center gap-2">
              <span className="text-4xl">✨</span>
              Necessary Tasks
            </h2>
            <span className="px-4 py-2 rounded-full bg-islamic-teal/20 text-islamic-teal font-bold">
              {activity?.necessaryTasksCompleted || 0} / {TASKS.necessary.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TASKS.necessary.map((task, index) => (
              <div
                key={task.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TaskCard
                  task={task}
                  completed={isTaskCompleted(task.id)}
                  onToggle={() => handleToggleTask(task.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Extra Tasks */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-arabic font-bold text-islamic-blue flex items-center gap-2">
              <span className="text-4xl">🌟</span>
              Extra Tasks
            </h2>
            <span className="px-4 py-2 rounded-full bg-islamic-blue/20 text-islamic-blue font-bold">
              {activity?.extraTasksCompleted || 0} / {TASKS.extra.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TASKS.extra.map((task, index) => (
              <div
                key={task.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TaskCard
                  task={task}
                  completed={isTaskCompleted(task.id)}
                  onToggle={() => handleToggleTask(task.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bonus Notification */}
        {activity?.bonusAwarded && (
          <div className="islamic-card bg-gradient-to-r from-gold-100 to-yellow-100 border-2 border-gold-400 animate-pulse-glow">
            <div className="flex items-center gap-4">
              <span className="text-5xl">🎉</span>
              <div>
                <p className="text-xl font-bold text-gold-700 mb-1 font-arabic">
                  Masha'Allah! Bonus Earned!
                </p>
                <p className="text-gray-700">
                  You've completed all necessary tasks and earned a bonus reward! May Allah accept your efforts.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Surah Viewer Modal */}
      {showSurahViewer && (
        <SurahViewer
          surahType={showSurahViewer}
          onComplete={() => handleSurahComplete(showSurahViewer)}
        />
      )}
    </div>
  );
};

export default EnhancedDashboard;
