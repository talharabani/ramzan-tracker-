import { useState, useEffect } from 'react';
import api from '../config/api';

const History = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await api.getHistory(30);
      setActivities(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

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
        <div className="islamic-card mb-8 animate-fade-in">
          <h1 className="text-3xl font-arabic font-bold text-islamic-navy mb-2 flex items-center gap-3">
            <span>📅</span> Activity History
          </h1>
          <p className="text-islamic-navy/70">Review your past Ramadan activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.length === 0 ? (
            <div className="col-span-full islamic-card text-center py-12">
              <p className="text-islamic-navy/70 text-lg">No activity history yet. Start tracking today!</p>
            </div>
          ) : (
            activities.map(activity => (
              <div key={activity._id} className="islamic-card animate-slide-up hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-islamic-navy">{formatDate(activity.date)}</h3>
                  <span className="px-3 py-1 rounded-full bg-islamic-gold/20 text-islamic-gold font-bold">
                    +{activity.totalPointsEarnedToday} pts
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 rounded-xl bg-islamic-emerald/5">
                    <span className="block text-sm text-islamic-navy/70 mb-1">Completion</span>
                    <span className="text-2xl font-bold text-islamic-emerald">{activity.completionPercentage}%</span>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-islamic-gold/5">
                    <span className="block text-sm text-islamic-navy/70 mb-1">Tasks</span>
                    <span className="text-2xl font-bold text-islamic-gold">{activity.tasksCompleted.length}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activity.tasksCompleted.slice(0, 5).map((task, idx) => (
                    <span key={idx} className="px-2 py-1 rounded-lg bg-islamic-beige text-islamic-navy text-xs font-medium">
                      {task.taskName}
                    </span>
                  ))}
                  {activity.tasksCompleted.length > 5 && (
                    <span className="px-2 py-1 rounded-lg bg-islamic-emerald/20 text-islamic-emerald text-xs font-medium">
                      +{activity.tasksCompleted.length - 5} more
                    </span>
                  )}
                </div>

                {activity.bonusAwarded && (
                  <div className="mt-3 px-3 py-2 rounded-lg bg-gradient-to-r from-islamic-gold/20 to-islamic-emerald/20 text-islamic-emerald text-sm font-bold text-center">
                    🎉 Bonus Earned
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
