import IslamicContent from '../models/IslamicContent.js';
import PrayerTracking from '../models/PrayerTracking.js';
import User from '../models/User.js';
import { 
  quranService, 
  hadithService, 
  prayerTimesService,
  islamicDateService 
} from '../services/islamicAPI.js';

// ========== DAILY CONTENT ==========

// Get today's Islamic content (Ayah + Hadith + Date)
export const getTodayContent = async (req, res) => {
  try {
    const userId = req.user?._id;
    
    // Check if content is already cached
    let content = await IslamicContent.getTodayContent();
    
    if (!content) {
      // Fetch fresh content from APIs
      const [ayah, hadith, islamicDate] = await Promise.all([
        quranService.getRandomAyah('en'),
        hadithService.getRandomHadith(),
        islamicDateService.getCurrentIslamicDate()
      ]);
      
      const isFriday = prayerTimesService.isFriday();
      const isRamadan = await islamicDateService.isRamadan();
      
      // Cache the content
      content = await IslamicContent.ensureTodayContent({
        dailyAyah: ayah,
        dailyHadith: hadith,
        islamicDate,
        isFriday,
        isRamadan
      });
    }
    
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error fetching today\'s content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch today\'s Islamic content',
      error: error.message
    });
  }
};

// Get daily Ayah only
export const getDailyAyah = async (req, res) => {
  try {
    let content = await IslamicContent.getTodayContent();
    
    if (!content) {
      const ayah = await quranService.getRandomAyah('en');
      content = await IslamicContent.ensureTodayContent({
        dailyAyah: ayah
      });
    }
    
    res.json({
      success: true,
      data: content.dailyAyah
    });
  } catch (error) {
    console.error('Error fetching daily ayah:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch daily ayah',
      error: error.message
    });
  }
};

// Get daily Hadith only
export const getDailyHadith = async (req, res) => {
  try {
    let content = await IslamicContent.getTodayContent();
    
    if (!content) {
      const hadith = await hadithService.getRandomHadith();
      content = await IslamicContent.ensureTodayContent({
        dailyHadith: hadith
      });
    }
    
    res.json({
      success: true,
      data: content.dailyHadith
    });
  } catch (error) {
    console.error('Error fetching daily hadith:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch daily hadith',
      error: error.message
    });
  }
};

// ========== SURAH ENDPOINTS ==========

// Get Surah Mulk
export const getSurahMulk = async (req, res) => {
  try {
    const surah = await quranService.getSurahMulk();
    res.json({
      success: true,
      data: surah
    });
  } catch (error) {
    console.error('Error fetching Surah Mulk:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Surah Mulk',
      error: error.message
    });
  }
};

// Get Surah Kahf
export const getSurahKahf = async (req, res) => {
  try {
    const surah = await quranService.getSurahKahf();
    res.json({
      success: true,
      data: surah
    });
  } catch (error) {
    console.error('Error fetching Surah Kahf:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Surah Kahf',
      error: error.message
    });
  }
};

// Get specific Surah by number
export const getSurah = async (req, res) => {
  try {
    const { surahNumber } = req.params;
    const surah = await quranService.getSurah(parseInt(surahNumber));
    res.json({
      success: true,
      data: surah
    });
  } catch (error) {
    console.error('Error fetching surah:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch surah',
      error: error.message
    });
  }
};

// Get random ayahs for tafseer task
export const getRandomAyahs = async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 5;
    const ayahs = await quranService.getRandomAyahs(count);
    res.json({
      success: true,
      data: ayahs
    });
  } catch (error) {
    console.error('Error fetching random ayahs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch random ayahs',
      error: error.message
    });
  }
};

// ========== PRAYER TIMES ==========

// Get prayer times
export const getPrayerTimes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { city, country, latitude, longitude } = req.query;
    
    let prayerTimes;
    
    if (latitude && longitude) {
      // Use coordinates if provided
      prayerTimes = await prayerTimesService.getPrayerTimesByCoordinates(
        parseFloat(latitude),
        parseFloat(longitude),
        user.preferences?.prayerMethod || 2
      );
    } else {
      // Use city or user preferences
      const userCity = city || user.preferences?.city || 'Mecca';
      const userCountry = country || user.preferences?.country || 'Saudi Arabia';
      
      prayerTimes = await prayerTimesService.getPrayerTimesByCity(
        userCity,
        userCountry,
        user.preferences?.prayerMethod || 2
      );
    }
    
    // Get next prayer
    const nextPrayer = prayerTimesService.getNextPrayer(prayerTimes.timings);
    
    // Get or create today's prayer tracking
    const tracking = await PrayerTracking.getTodayTracking(
      req.user._id,
      prayerTimes.timings,
      prayerTimes.location || prayerTimes.coordinates
    );
    
    res.json({
      success: true,
      data: {
        ...prayerTimes,
        nextPrayer,
        tracking
      }
    });
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch prayer times',
      error: error.message
    });
  }
};

// Mark prayer as completed
export const markPrayerCompleted = async (req, res) => {
  try {
    const { prayerName, onTime } = req.body;
    const userId = req.user._id;
    
    if (!['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].includes(prayerName)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid prayer name'
      });
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tracking = await PrayerTracking.findOne({
      userId,
      date: today
    });
    
    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: 'Prayer tracking not found for today'
      });
    }
    
    // Mark prayer completed
    tracking.markPrayerCompleted(prayerName, onTime);
    await tracking.save();
    
    // Update user statistics
    if (onTime) {
      await User.findByIdAndUpdate(userId, {
        $inc: { totalPrayersOnTime: 1 }
      });
    }
    
    res.json({
      success: true,
      data: tracking
    });
  } catch (error) {
    console.error('Error marking prayer completed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark prayer completed',
      error: error.message
    });
  }
};

// ========== USER PREFERENCES ==========

// Update user location preferences
export const updateLocationPreferences = async (req, res) => {
  try {
    const { city, country, prayerMethod, language } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          'preferences.city': city,
          'preferences.country': country,
          'preferences.prayerMethod': prayerMethod,
          'preferences.language': language
        }
      },
      { new: true }
    );
    
    res.json({
      success: true,
      data: user.preferences
    });
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update preferences',
      error: error.message
    });
  }
};

// ========== ISLAMIC DATE ==========

// Get current Islamic date
export const getIslamicDate = async (req, res) => {
  try {
    const islamicDate = await islamicDateService.getCurrentIslamicDate();
    const isRamadan = await islamicDateService.isRamadan();
    
    res.json({
      success: true,
      data: {
        ...islamicDate,
        isRamadan
      }
    });
  } catch (error) {
    console.error('Error fetching Islamic date:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Islamic date',
      error: error.message
    });
  }
};

// Check if today is special (Friday, Ramadan, etc.)
export const checkSpecialDay = async (req, res) => {
  try {
    const isFriday = prayerTimesService.isFriday();
    const isRamadan = await islamicDateService.isRamadan();
    const islamicDate = await islamicDateService.getCurrentIslamicDate();
    
    res.json({
      success: true,
      data: {
        isFriday,
        isRamadan,
        islamicDate
      }
    });
  } catch (error) {
    console.error('Error checking special day:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check special day',
      error: error.message
    });
  }
};
