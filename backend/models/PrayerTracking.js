import mongoose from 'mongoose';

// Model to track user's prayer times and completion
const prayerTrackingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  date: {
    type: Date,
    required: true,
    index: true
  },
  
  // Prayer completion status
  prayers: {
    fajr: {
      completed: { type: Boolean, default: false },
      completedAt: Date,
      onTime: { type: Boolean, default: false }
    },
    dhuhr: {
      completed: { type: Boolean, default: false },
      completedAt: Date,
      onTime: { type: Boolean, default: false }
    },
    asr: {
      completed: { type: Boolean, default: false },
      completedAt: Date,
      onTime: { type: Boolean, default: false }
    },
    maghrib: {
      completed: { type: Boolean, default: false },
      completedAt: Date,
      onTime: { type: Boolean, default: false }
    },
    isha: {
      completed: { type: Boolean, default: false },
      completedAt: Date,
      onTime: { type: Boolean, default: false }
    }
  },
  
  // Prayer times for the day
  prayerTimes: {
    fajr: String,
    sunrise: String,
    dhuhr: String,
    asr: String,
    maghrib: String,
    isha: String,
    midnight: String
  },
  
  // Location info
  location: {
    city: String,
    country: String,
    latitude: Number,
    longitude: Number
  },
  
  // Statistics
  totalPrayersCompleted: {
    type: Number,
    default: 0
  },
  
  totalOnTimePrayers: {
    type: Number,
    default: 0
  },
  
  allPrayersCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Compound index for user and date
prayerTrackingSchema.index({ userId: 1, date: 1 }, { unique: true });

// Method to mark prayer as completed
prayerTrackingSchema.methods.markPrayerCompleted = function(prayerName, onTime = false) {
  if (this.prayers[prayerName]) {
    this.prayers[prayerName].completed = true;
    this.prayers[prayerName].completedAt = new Date();
    this.prayers[prayerName].onTime = onTime;
    
    // Update statistics
    this.calculateStatistics();
  }
};

// Calculate prayer statistics
prayerTrackingSchema.methods.calculateStatistics = function() {
  const prayerNames = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
  
  this.totalPrayersCompleted = prayerNames.filter(
    name => this.prayers[name]?.completed
  ).length;
  
  this.totalOnTimePrayers = prayerNames.filter(
    name => this.prayers[name]?.onTime
  ).length;
  
  this.allPrayersCompleted = this.totalPrayersCompleted === 5;
};

// Static method to get or create today's tracking
prayerTrackingSchema.statics.getTodayTracking = async function(userId, prayerTimes, location) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let tracking = await this.findOne({ userId, date: today });
  
  if (!tracking) {
    tracking = await this.create({
      userId,
      date: today,
      prayerTimes,
      location
    });
  }
  
  return tracking;
};

const PrayerTracking = mongoose.model('PrayerTracking', prayerTrackingSchema);

export default PrayerTracking;
