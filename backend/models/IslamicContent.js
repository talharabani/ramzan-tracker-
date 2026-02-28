import mongoose from 'mongoose';

// Model to cache daily Islamic content (Ayah, Hadith)
// Prevents redundant API calls and ensures consistent daily content
const islamicContentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
    index: true
  },
  
  // Daily Ayah
  dailyAyah: {
    arabic: String,
    translation: String,
    surahName: String,
    surahNumber: Number,
    ayahNumber: Number,
    reference: String,
    juz: Number
  },
  
  // Daily Hadith
  dailyHadith: {
    arabic: String,
    english: String,
    urdu: String,
    reference: String,
    bookName: String,
    chapterName: String,
    hadithNumber: String,
    category: String
  },
  
  // Islamic Date
  islamicDate: {
    day: Number,
    month: String,
    year: Number,
    formatted: String,
    weekday: String
  },
  
  // Special day indicators
  isFriday: {
    type: Boolean,
    default: false
  },
  
  isRamadan: {
    type: Boolean,
    default: false
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // Auto-delete after 24 hours
  }
}, {
  timestamps: true
});

// Index for efficient date queries
islamicContentSchema.index({ date: 1 });

// Static method to get or create today's content
islamicContentSchema.statics.getTodayContent = async function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let content = await this.findOne({ date: today });
  
  if (!content) {
    // Content not cached yet, will be created by controller
    return null;
  }
  
  return content;
};

// Static method to ensure content exists for today
islamicContentSchema.statics.ensureTodayContent = async function(contentData) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const content = await this.findOneAndUpdate(
    { date: today },
    { 
      $set: {
        ...contentData,
        date: today
      }
    },
    { 
      upsert: true, 
      new: true,
      setDefaultsOnInsert: true
    }
  );
  
  return content;
};

const IslamicContent = mongoose.model('IslamicContent', islamicContentSchema);

export default IslamicContent;
