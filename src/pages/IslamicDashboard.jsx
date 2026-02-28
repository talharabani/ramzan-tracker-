import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import { TASKS } from '../config/tasks';
import { getCurrentIslamicDate } from '../services/islamicApi';
import TaskCard from '../components/TaskCard';
import DailyQuiz from '../components/DailyQuiz';
import PrayerTimes from '../components/PrayerTimes';
import DailyAyah from '../components/DailyAyah';
import DailyAzkar from '../components/DailyAzkar';
import TasbeehCounter from '../components/TasbeehCounter';
import SurahKahfCard from '../components/SurahKahfCard';
import SurahMulkCard from '../components/SurahMulkCard';

const IslamicDashboard = () => {
  const { user, updateUser } = useAuth();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [islamicDate, setIslamicDate] = useState(null);
  const [isFriday, setIsFriday] = useState(false);

  useEffect(() => {
    fetchTodayActivity();
    updateStreakOnLoad();
    fetchIslamicDate();
    checkIfFriday();
  }, []);

  const checkIfFriday = () => {
    const today = new Date().getDay();
    setIsFriday(today === 5); // 5 = Friday
  };

  const fetchTodayActivity = async () => {
    try {
      const { data } = await api.getTodayActivity();
      setActivity(data);
    } catch (error) {
      console.error('Error fetching activity:', error);
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

  const fetchIslamicDate = async () => {
    const date = await getCurrentIslamicDate();
    if (date) {
      setIslamicDate(date);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const { data } = await api.toggleTask(taskId);
      setActivity(data.activity);
      updateUser(data.user);
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const isTaskCompleted = (taskId) => {
    return activity?.tasksCompleted?.some(t => t.taskId === taskId) || false;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Islamic Header */}
        <div className="mb-8 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-6xl crescent-moon"></span>
            <div>
              <h1 className="text-5xl font-arabic font-bold text-islamic-emerald mb-2">
                السلام عليكم
              </h1>
              <p className="text-2xl text-islamic-navy">
                Assalamu Alaikum, {user?.fullName?.split(' ')[0]}
              </p>
            </div>
          </div>
          
          {islamicDate && (
            <div className="inline-block px-6 py-3 bg-white rounded-2xl shadow-md border border-islamic-emerald/20">
              <p className="text-sm text-gray-600 mb-1">Islamic Date</p>
              <p className="text-xl font-arabic font-bold text-islamic-gold">
                {islamicDate.fullDate}
              </p>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="islamic-card bg-gradient-to-br from-islamic-gold/10 to-islamic-gold/5 border-islamic-gold/30 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-islamic-gold to-islamic-gold-dark flex items-center justify-center text-3xl shadow-lg">
                ⭐
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Total Points</p>
                <p className="text-4xl font-bold text-islamic-gold">{user?.totalPoints || 0}</p>
              </div>
            </div>
          </div>

          <div className="islamic-card bg-gradient-to-br from-islamic-emerald/10 to-islamic-emerald/5 border-islamic-emerald/30 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-islamic-emerald to-islamic-emerald-dark flex items-center justify-center text-3xl shadow-lg">
                🎯
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Current Level</p>
                <p className="text-4xl font-bold text-islamic-emerald">{user?.currentLevel || 1}</p>
              </div>
            </div>
          </div>

          <div className="islamic-card bg-gradient-to-br from-orange-100 to-orange-50 border-orange-300 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-3xl shadow-lg">
                🔥
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Streak Days</p>
                <p className="text-4xl font-bold text-orange-600">{user?.streakCount || 0}</p>
              </div>
            </div>
          </div>

          <div className="islamic-card bg-gradient-to-br from-islamic-navy/10 to-islamic-navy/5 border-islamic-navy/30 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-islamic-navy to-islamic-navy-dark flex items-center justify-center text-3xl shadow-lg">
                📊
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Today's Progress</p>
                <p className="text-4xl font-bold text-islamic-navy">{activity?.completionPercentage || 0}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Prayer Times - Large Featured Section */}
        <div className="mb-8">
          <PrayerTimes />
        </div>

        {/* Daily Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DailyAyah />
          <DailyQuiz />
        </div>

        {/* Islamic Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DailyAzkar />
          <TasbeehCounter />
        </div>

        {/* Essential Surahs Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-arabic font-bold text-islamic-emerald mb-6 flex items-center gap-3">
            <span className="text-5xl">📖</span>
            Essential Surahs
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SurahKahfCard />
            <SurahMulkCard />
          </div>
        </div>

        {/* Tasks Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-arabic font-bold text-islamic-emerald flex items-center gap-3">
              <span className="text-5xl">✨</span>
              Necessary Tasks
            </h2>
            <span className="px-6 py-3 rounded-2xl bg-islamic-emerald/20 text-islamic-emerald font-bold text-lg border-2 border-islamic-emerald/30">
              {activity?.necessaryTasksCompleted || 0} / {TASKS.necessary.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TASKS.necessary.map((task, index) => {
              const isCompleted = isTaskCompleted(task.id);
              const isFridayTask = task.id === 'surah_kahf';
              const showFridayBadge = isFridayTask && isFriday;

              return (
                <div
                  key={task.id}
                  className="animate-fade-in relative"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {showFridayBadge && (
                    <div className="absolute -top-2 -right-2 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-islamic-gold to-islamic-gold-light text-white text-xs font-bold shadow-lg animate-pulse">
                      🕌 Friday Special
                    </div>
                  )}
                  <TaskCard
                    task={task}
                    completed={isCompleted}
                    onToggle={() => handleToggleTask(task.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Extra Tasks */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-arabic font-bold text-islamic-navy flex items-center gap-3">
              <span className="text-5xl">🌟</span>
              Extra Tasks
            </h2>
            <span className="px-6 py-3 rounded-2xl bg-islamic-navy/20 text-islamic-navy font-bold text-lg border-2 border-islamic-navy/30">
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
          <div className="islamic-card bg-gradient-to-r from-islamic-gold/20 to-islamic-emerald/20 border-2 border-islamic-gold animate-pulse">
            <div className="flex items-center gap-4">
              <span className="text-6xl">🎉</span>
              <div>
                <p className="text-2xl font-bold text-islamic-emerald mb-2">
                  Masha'Allah! Bonus Earned!
                </p>
                <p className="text-gray-700 text-lg">
                  You've completed all necessary tasks and earned a bonus reward!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IslamicDashboard;
