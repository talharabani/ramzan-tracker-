import DailyActivity from '../models/DailyActivity.js';
import User from '../models/User.js';
import { TASKS, BONUS_POINTS, STREAK_REQUIRED_TASKS } from '../config/tasks.js';

const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

const calculateLevel = (points) => {
  return Math.floor(points / 500) + 1;
};

export const getTodayActivity = async (req, res) => {
  try {
    const today = getTodayDate();
    let activity = await DailyActivity.findOne({ userId: req.user._id, date: today });

    if (!activity) {
      activity = await DailyActivity.create({
        userId: req.user._id,
        date: today,
        tasksCompleted: [],
        totalPointsEarnedToday: 0,
        completionPercentage: 0
      });
    }

    res.json(activity);
  } catch (error) {
    console.error('Get today activity error:', error);
    res.status(500).json({ message: 'Error fetching today\'s activity' });
  }
};

export const toggleTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const today = getTodayDate();

    let activity = await DailyActivity.findOne({ userId: req.user._id, date: today });
    if (!activity) {
      activity = await DailyActivity.create({
        userId: req.user._id,
        date: today,
        tasksCompleted: [],
        totalPointsEarnedToday: 0
      });
    }

    const allTasks = [...TASKS.necessary, ...TASKS.extra];
    const task = allTasks.find(t => t.id === taskId);
    if (!task) {
      return res.status(400).json({ message: 'Invalid task' });
    }

    const taskIndex = activity.tasksCompleted.findIndex(t => t.taskId === taskId);
    const user = await User.findById(req.user._id);

    if (taskIndex > -1) {
      // Uncomplete task
      const removedTask = activity.tasksCompleted[taskIndex];
      activity.tasksCompleted.splice(taskIndex, 1);
      activity.totalPointsEarnedToday -= removedTask.points;
      user.totalPoints -= removedTask.points;

      if (removedTask.points === BONUS_POINTS) {
        activity.bonusAwarded = false;
      }
      
      // Decrement user statistics
      updateUserStats(user, taskId, false);
    } else {
      // Complete task
      activity.tasksCompleted.push({
        taskId: task.id,
        taskName: task.name,
        points: task.points,
        completedAt: new Date()
      });
      activity.totalPointsEarnedToday += task.points;
      user.totalPoints += task.points;
      
      // Increment user statistics
      updateUserStats(user, taskId, true);
    }

    // Calculate completion stats
    const necessaryCompleted = activity.tasksCompleted.filter(t => 
      TASKS.necessary.some(nt => nt.id === t.taskId)
    ).length;
    const extraCompleted = activity.tasksCompleted.filter(t => 
      TASKS.extra.some(et => et.id === t.taskId)
    ).length;

    activity.necessaryTasksCompleted = necessaryCompleted;
    activity.extraTasksCompleted = extraCompleted;
    activity.completionPercentage = Math.round((necessaryCompleted / TASKS.necessary.length) * 100);

    // Award bonus if all necessary tasks completed
    if (necessaryCompleted === TASKS.necessary.length && !activity.bonusAwarded) {
      activity.totalPointsEarnedToday += BONUS_POINTS;
      user.totalPoints += BONUS_POINTS;
      activity.bonusAwarded = true;
      activity.tasksCompleted.push({
        taskId: 'bonus',
        taskName: 'All Necessary Tasks Bonus',
        points: BONUS_POINTS,
        completedAt: new Date()
      });
    }

    // Update level
    user.currentLevel = calculateLevel(user.totalPoints);
    user.lastActiveDate = new Date();

    await activity.save();
    await user.save();

    res.json({
      activity,
      user: {
        totalPoints: user.totalPoints,
        currentLevel: user.currentLevel,
        streakCount: user.streakCount,
        quranReadCount: user.quranReadCount,
        hadithExplainedCount: user.hadithExplainedCount,
        surahMulkCount: user.surahMulkCount,
        surahKahfCount: user.surahKahfCount
      }
    });
  } catch (error) {
    console.error('Toggle task error:', error);
    res.status(500).json({ message: 'Error toggling task' });
  }
};

// Helper function to update user statistics based on task
const updateUserStats = (user, taskId, increment) => {
  const delta = increment ? 1 : -1;
  
  switch(taskId) {
    case 'supara_1':
    case 'supara_2':
      user.quranReadCount = Math.max(0, user.quranReadCount + delta);
      break;
    case 'surah_mulk':
      user.surahMulkCount = Math.max(0, user.surahMulkCount + delta);
      user.quranReadCount = Math.max(0, user.quranReadCount + delta);
      break;
    case 'surah_kahf':
      user.surahKahfCount = Math.max(0, user.surahKahfCount + delta);
      user.quranReadCount = Math.max(0, user.quranReadCount + delta);
      break;
    case 'ayat_tafseer':
      user.tafseerCount = Math.max(0, user.tafseerCount + delta);
      break;
    case 'explain_hadith':
      user.hadithExplainedCount = Math.max(0, user.hadithExplainedCount + delta);
      break;
    case 'azkar':
      user.azkarCount = Math.max(0, user.azkarCount + delta);
      break;
    case 'tahajjud':
      user.tahajjudCount = Math.max(0, user.tahajjudCount + delta);
      break;
    case 'pray_on_time':
      user.totalPrayersOnTime = Math.max(0, user.totalPrayersOnTime + (increment ? 5 : -5));
      break;
  }
};

export const getActivityByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const activity = await DailyActivity.findOne({ userId: req.user._id, date });

    if (!activity) {
      return res.status(404).json({ message: 'No activity found for this date' });
    }

    res.json(activity);
  } catch (error) {
    console.error('Get activity by date error:', error);
    res.status(500).json({ message: 'Error fetching activity' });
  }
};

export const getMonthlySummary = async (req, res) => {
  try {
    const { year, month } = req.params;
    const startDate = `${year}-${month.padStart(2, '0')}-01`;
    const endDate = `${year}-${month.padStart(2, '0')}-31`;

    const activities = await DailyActivity.find({
      userId: req.user._id,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    const summary = {
      totalDays: activities.length,
      totalPoints: activities.reduce((sum, a) => sum + a.totalPointsEarnedToday, 0),
      averageCompletion: activities.length > 0 
        ? Math.round(activities.reduce((sum, a) => sum + a.completionPercentage, 0) / activities.length)
        : 0,
      activities
    };

    res.json(summary);
  } catch (error) {
    console.error('Get monthly summary error:', error);
    res.status(500).json({ message: 'Error fetching monthly summary' });
  }
};

export const updateStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const today = getTodayDate();
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    const todayActivity = await DailyActivity.findOne({ userId: user._id, date: today });
    const yesterdayActivity = await DailyActivity.findOne({ userId: user._id, date: yesterday });

    if (todayActivity && todayActivity.necessaryTasksCompleted >= STREAK_REQUIRED_TASKS) {
      if (!user.lastActiveDate || user.lastActiveDate.toISOString().split('T')[0] !== today) {
        if (yesterdayActivity && yesterdayActivity.necessaryTasksCompleted >= STREAK_REQUIRED_TASKS) {
          user.streakCount += 1;
        } else if (!user.lastActiveDate) {
          user.streakCount = 1;
        } else {
          const lastActive = user.lastActiveDate.toISOString().split('T')[0];
          if (lastActive !== yesterday) {
            user.streakCount = 1;
          } else {
            user.streakCount += 1;
          }
        }
        user.lastActiveDate = new Date();
        await user.save();
      }
    }

    res.json({ streakCount: user.streakCount });
  } catch (error) {
    console.error('Update streak error:', error);
    res.status(500).json({ message: 'Error updating streak' });
  }
};
