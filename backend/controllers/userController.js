import User from '../models/User.js';
import DailyActivity from '../models/DailyActivity.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select('fullName totalPoints currentLevel streakCount')
      .sort({ totalPoints: -1 })
      .limit(50);

    res.json(users);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
};

export const getHistory = async (req, res) => {
  try {
    const { limit = 30 } = req.query;
    
    const activities = await DailyActivity.find({ userId: req.user._id })
      .sort({ date: -1 })
      .limit(parseInt(limit));

    res.json(activities);
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ message: 'Error fetching history' });
  }
};
