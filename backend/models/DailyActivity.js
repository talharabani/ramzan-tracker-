import mongoose from 'mongoose';

const dailyActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true
  },
  tasksCompleted: [{
    taskId: String,
    taskName: String,
    points: Number,
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalPointsEarnedToday: {
    type: Number,
    default: 0
  },
  completionPercentage: {
    type: Number,
    default: 0
  },
  necessaryTasksCompleted: {
    type: Number,
    default: 0
  },
  extraTasksCompleted: {
    type: Number,
    default: 0
  },
  bonusAwarded: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Compound index for efficient queries
dailyActivitySchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model('DailyActivity', dailyActivitySchema);
