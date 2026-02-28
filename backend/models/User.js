import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  currentLevel: {
    type: Number,
    default: 1
  },
  streakCount: {
    type: Number,
    default: 0
  },
  lastActiveDate: {
    type: Date,
    default: null
  },
  
  // Islamic Activity Tracking
  quranReadCount: {
    type: Number,
    default: 0
  },
  hadithExplainedCount: {
    type: Number,
    default: 0
  },
  totalPrayersOnTime: {
    type: Number,
    default: 0
  },
  charityCount: {
    type: Number,
    default: 0
  },
  surahMulkCount: {
    type: Number,
    default: 0
  },
  surahKahfCount: {
    type: Number,
    default: 0
  },
  tafseerCount: {
    type: Number,
    default: 0
  },
  azkarCount: {
    type: Number,
    default: 0
  },
  tahajjudCount: {
    type: Number,
    default: 0
  },
  
  // Preferences
  preferences: {
    city: {
      type: String,
      default: 'Mecca'
    },
    country: {
      type: String,
      default: 'Saudi Arabia'
    },
    language: {
      type: String,
      enum: ['en', 'ur'],
      default: 'en'
    },
    prayerMethod: {
      type: Number,
      default: 2 // ISNA
    }
  },
  
  // Achievements
  achievements: [{
    name: String,
    description: String,
    icon: String,
    unlockedAt: Date
  }],
  
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
