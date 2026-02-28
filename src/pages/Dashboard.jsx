import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import { TASKS } from '../config/tasks';
import TaskCard from '../components/TaskCard';
import StatsCard from '../components/StatsCard';
import './Dashboard.css';

const Dashboard = () => {
  const { user, updateUser } = useAuth();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayActivity();
    updateStreakOnLoad();
  }, []);

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
    return <div className="loading-screen"><div className="spinner"></div></div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>As-salamu alaykum, {user?.fullName?.split(' ')[0]}! 🌙</h1>
          <p className="subtitle">Track your spiritual growth this Ramadan</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatsCard
          icon="⭐"
          label="Total Points"
          value={user?.totalPoints || 0}
          color="gold"
        />
        <StatsCard
          icon="🎯"
          label="Current Level"
          value={user?.currentLevel || 1}
          color="emerald"
        />
        <StatsCard
          icon="🔥"
          label="Streak Days"
          value={user?.streakCount || 0}
          color="orange"
        />
        <StatsCard
          icon="📊"
          label="Today's Progress"
          value={`${activity?.completionPercentage || 0}%`}
          color="blue"
        />
      </div>

      <div className="tasks-section">
        <div className="section-header">
          <h2>✨ Necessary Tasks</h2>
          <span className="task-count">
            {activity?.necessaryTasksCompleted || 0} / {TASKS.necessary.length}
          </span>
        </div>
        <div className="tasks-grid">
          {TASKS.necessary.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              completed={isTaskCompleted(task.id)}
              onToggle={() => handleToggleTask(task.id)}
            />
          ))}
        </div>
      </div>

      <div className="tasks-section">
        <div className="section-header">
          <h2>🌟 Extra Tasks</h2>
          <span className="task-count">
            {activity?.extraTasksCompleted || 0} / {TASKS.extra.length}
          </span>
        </div>
        <div className="tasks-grid">
          {TASKS.extra.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              completed={isTaskCompleted(task.id)}
              onToggle={() => handleToggleTask(task.id)}
            />
          ))}
        </div>
      </div>

      {activity?.bonusAwarded && (
        <div className="bonus-notification">
          🎉 Congratulations! You've completed all necessary tasks and earned a bonus!
        </div>
      )}
    </div>
  );
};

export default Dashboard;
