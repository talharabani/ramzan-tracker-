import axios from 'axios';

// Islamic API Service Layer
// Integrates Quran API, Hadith API, and Prayer Times API

// ========== QURAN API ==========
// Using Al Quran Cloud API (Free, No auth required)
const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

export const quranService = {
  // Get random ayah with translation
  async getRandomAyah(language = 'en') {
    try {
      // Get random surah (1-114) and random ayah
      const randomSurah = Math.floor(Math.random() * 114) + 1;
      
      // Get surah info first to know ayah count
      const surahInfo = await axios.get(`${QURAN_API_BASE}/surah/${randomSurah}`);
      const ayahCount = surahInfo.data.data.numberOfAyahs;
      const randomAyah = Math.floor(Math.random() * ayahCount) + 1;
      
      // Fetch Arabic and English translation together
      const identifier = language === 'en' ? 'en.asad' : 'ur.jalandhry';
      const response = await axios.get(
        `${QURAN_API_BASE}/ayah/${randomSurah}:${randomAyah}/editions/quran-uthmani,${identifier}`
      );
      
      const data = response.data.data;
      return {
        arabic: data[0].text,
        translation: data[1].text,
        surahName: data[0].surah.englishName,
        surahNumber: data[0].surah.number,
        ayahNumber: data[0].numberInSurah,
        reference: `${data[0].surah.englishName} ${data[0].surah.number}:${data[0].numberInSurah}`,
        juz: data[0].juz,
        audio: null // Al Quran Cloud doesn't provide direct audio URLs
      };
    } catch (error) {
      console.error('Error fetching random ayah:', error.message);
      throw new Error('Failed to fetch Quran ayah');
    }
  },

  // Get specific surah (e.g., Mulk, Kahf)
  async getSurah(surahNumber, includeTranslation = true) {
    try {
      const editions = includeTranslation 
        ? 'quran-uthmani,en.asad'
        : 'quran-uthmani';
      
      const response = await axios.get(
        `${QURAN_API_BASE}/surah/${surahNumber}/editions/${editions}`
      );
      
      const data = response.data.data;
      const arabic = data[0];
      const translation = includeTranslation ? data[1] : null;
      
      return {
        number: arabic.number,
        name: arabic.englishName,
        arabicName: arabic.name,
        englishNameTranslation: arabic.englishNameTranslation,
        revelationType: arabic.revelationType,
        numberOfAyahs: arabic.numberOfAyahs,
        ayahs: arabic.ayahs.map((ayah, index) => ({
          number: ayah.numberInSurah,
          arabic: ayah.text,
          translation: translation ? translation.ayahs[index].text : null
        }))
      };
    } catch (error) {
      console.error('Error fetching surah:', error.message);
      throw new Error('Failed to fetch surah');
    }
  },

  // Get Surah Mulk (67)
  async getSurahMulk() {
    return await this.getSurah(67);
  },

  // Get Surah Kahf (18)
  async getSurahKahf() {
    return await this.getSurah(18);
  },

  // Get multiple random ayahs for tafseer task
  async getRandomAyahs(count = 5) {
    const ayahs = [];
    for (let i = 0; i < count; i++) {
      const ayah = await this.getRandomAyah();
      ayahs.push(ayah);
    }
    return ayahs;
  }
};

// ========== HADITH API ==========
// Using Hadith API (Free, No auth required)
const HADITH_API_BASE = 'https://random-hadith-generator.vercel.app';

export const hadithService = {
  // Get random hadith
  async getRandomHadith() {
    try {
      const response = await axios.get(`${HADITH_API_BASE}/hadiths/`);
      const data = response.data.data;
      
      return {
        arabic: data.hadithArabic || '',
        english: data.hadithEnglish,
        urdu: data.hadithUrdu || '',
        reference: `${data.book.bookName} - ${data.chapterName}`,
        bookName: data.book.bookName,
        chapterName: data.chapterName,
        hadithNumber: data.hadithNumber,
        category: this.categorizeHadith(data.chapterName)
      };
    } catch (error) {
      console.error('Error fetching hadith:', error.message);
      // Fallback to alternative API
      return await this.getRandomHadithFallback();
    }
  },

  // Fallback hadith API
  async getRandomHadithFallback() {
    try {
      const collections = ['bukhari', 'muslim', 'tirmidhi', 'abudawud'];
      const collection = collections[Math.floor(Math.random() * collections.length)];
      
      // Use hadithapi.com as fallback
      const response = await axios.get(`https://hadithapi.com/api/${collection}/random`);
      const data = response.data.hadith.data;
      
      return {
        arabic: data.hadith_arabic || '',
        english: data.hadith_english,
        urdu: '',
        reference: `${collection.charAt(0).toUpperCase() + collection.slice(1)} - ${data.refno}`,
        bookName: collection,
        chapterName: data.header || 'General',
        hadithNumber: data.refno,
        category: 'General'
      };
    } catch (error) {
      console.error('Error fetching fallback hadith:', error.message);
      throw new Error('Failed to fetch hadith');
    }
  },

  // Categorize hadith based on chapter name
  categorizeHadith(chapterName) {
    const categories = {
      salah: ['prayer', 'salah', 'namaz', 'fajr', 'zuhr', 'asr', 'maghrib', 'isha'],
      charity: ['charity', 'zakat', 'sadaqah', 'giving'],
      patience: ['patience', 'sabr', 'trials', 'hardship'],
      parents: ['parents', 'mother', 'father', 'family'],
      ramadan: ['fasting', 'ramadan', 'sawm'],
      quran: ['quran', 'recitation', 'reading']
    };

    const lowerChapter = chapterName.toLowerCase();
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerChapter.includes(keyword))) {
        return category;
      }
    }
    return 'general';
  }
};

// ========== PRAYER TIMES API ==========
// Using Aladhan API (Free, No auth required)
const PRAYER_API_BASE = 'https://api.aladhan.com/v1';

export const prayerTimesService = {
  // Get prayer times by city
  async getPrayerTimesByCity(city = 'Mecca', country = 'Saudi Arabia', method = 2) {
    try {
      const response = await axios.get(
        `${PRAYER_API_BASE}/timingsByCity`,
        {
          params: {
            city,
            country,
            method // 2 = Islamic Society of North America (ISNA)
          }
        }
      );
      
      const data = response.data.data;
      return {
        date: {
          readable: data.date.readable,
          hijri: data.date.hijri.date,
          hijriMonth: data.date.hijri.month.en,
          gregorian: data.date.gregorian.date
        },
        timings: {
          fajr: data.timings.Fajr,
          sunrise: data.timings.Sunrise,
          dhuhr: data.timings.Dhuhr,
          asr: data.timings.Asr,
          maghrib: data.timings.Maghrib,
          isha: data.timings.Isha,
          midnight: data.timings.Midnight
        },
        location: { city, country }
      };
    } catch (error) {
      console.error('Error fetching prayer times by city:', error.message);
      throw new Error('Failed to fetch prayer times');
    }
  },

  // Get prayer times by coordinates (more accurate)
  async getPrayerTimesByCoordinates(latitude, longitude, method = 2) {
    try {
      const response = await axios.get(
        `${PRAYER_API_BASE}/timings`,
        {
          params: {
            latitude,
            longitude,
            method
          }
        }
      );
      
      const data = response.data.data;
      return {
        date: {
          readable: data.date.readable,
          hijri: data.date.hijri.date,
          hijriMonth: data.date.hijri.month.en,
          gregorian: data.date.gregorian.date
        },
        timings: {
          fajr: data.timings.Fajr,
          sunrise: data.timings.Sunrise,
          dhuhr: data.timings.Dhuhr,
          asr: data.timings.Asr,
          maghrib: data.timings.Maghrib,
          isha: data.timings.Isha,
          midnight: data.timings.Midnight
        },
        coordinates: { latitude, longitude }
      };
    } catch (error) {
      console.error('Error fetching prayer times by coordinates:', error.message);
      throw new Error('Failed to fetch prayer times');
    }
  },

  // Get next prayer time
  getNextPrayer(timings) {
    const now = new Date();
    const prayers = [
      { name: 'Fajr', time: timings.fajr },
      { name: 'Dhuhr', time: timings.dhuhr },
      { name: 'Asr', time: timings.asr },
      { name: 'Maghrib', time: timings.maghrib },
      { name: 'Isha', time: timings.isha }
    ];

    for (const prayer of prayers) {
      const prayerTime = this.parseTime(prayer.time);
      if (prayerTime > now) {
        return {
          name: prayer.name,
          time: prayer.time,
          countdown: this.getCountdown(prayerTime)
        };
      }
    }

    // If all prayers passed, return Fajr of next day
    return {
      name: 'Fajr',
      time: prayers[0].time,
      countdown: 'Tomorrow',
      isNextDay: true
    };
  },

  // Parse prayer time string to Date object
  parseTime(timeString) {
    const [time] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return date;
  },

  // Get countdown to next prayer
  getCountdown(prayerTime) {
    const now = new Date();
    const diff = prayerTime - now;
    
    if (diff <= 0) return 'Now';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  },

  // Check if today is Friday
  isFriday() {
    return new Date().getDay() === 5;
  }
};

// ========== ISLAMIC DATE API ==========
export const islamicDateService = {
  // Get current Islamic date
  async getCurrentIslamicDate() {
    try {
      const response = await axios.get(`${PRAYER_API_BASE}/gToH`);
      const data = response.data.data;
      
      return {
        day: data.hijri.day,
        month: data.hijri.month.en,
        year: data.hijri.year,
        formatted: `${data.hijri.day} ${data.hijri.month.en} ${data.hijri.year}`,
        weekday: data.hijri.weekday.en
      };
    } catch (error) {
      console.error('Error fetching Islamic date:', error.message);
      return null;
    }
  },

  // Check if currently in Ramadan
  async isRamadan() {
    const islamicDate = await this.getCurrentIslamicDate();
    return islamicDate?.month === 'Ramadan' || islamicDate?.month === 'Ramaḍān';
  }
};

export default {
  quranService,
  hadithService,
  prayerTimesService,
  islamicDateService
};
