import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data } = await api.getLeaderboard();
      setLeaders(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
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
            <span>🏆</span> Leaderboard
          </h1>
          <p className="text-islamic-navy/70">Top performers this Ramadan</p>
        </div>

        <div className="space-y-4">
          {leaders.map((leader, index) => (
            <div 
              key={leader._id} 
              className={`islamic-card animate-slide-up transition-all duration-300 ${
                leader._id === user?._id ? 'border-2 border-islamic-gold bg-islamic-gold/5' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-lg' :
                  index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg' :
                  'bg-islamic-beige text-islamic-navy'
                }`}>
                  {getMedalIcon(index + 1)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-islamic-navy mb-1">{leader.fullName}</h3>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center gap-1 text-islamic-gold font-medium">
                      ⭐ {leader.totalPoints} pts
                    </span>
                    <span className="flex items-center gap-1 text-islamic-emerald font-medium">
                      🎯 Level {leader.currentLevel}
                    </span>
                    <span className="flex items-center gap-1 text-orange-600 font-medium">
                      🔥 {leader.streakCount} days
                    </span>
                  </div>
                </div>
                {leader._id === user?._id && (
                  <div className="px-4 py-2 rounded-full bg-islamic-gold text-white font-bold text-sm">
                    You
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
