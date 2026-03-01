import axios from 'axios';

const ISLAMIC_API_KEY = 'tvn9KlFaSfJG1KnfZXfY8KVSGgpTk8jcaaWT2fmc2hKKHMmyi';
const BASE_URL = 'https://api.aladhan.com/v1';

// Get prayer times for today based on location
export const getPrayerTimes = async (latitude = 51.5074, longitude = -0.1278, method = 2) => {
  try {
    const today = new Date();
    const timestamp = Math.floor(today.getTime() / 1000);
    
    const response = await axios.get(`${BASE_URL}/timings/${timestamp}`, {
      params: {
        latitude,
        longitude,
        method, // 2 = Islamic Society of North America (ISNA)
      }
    });

    if (response.data.code === 200) {
      const timings = response.data.data.timings;
      return {
        Fajr: timings.Fajr,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
        Sunrise: timings.Sunrise,
        date: response.data.data.date.readable,
        hijriDate: response.data.data.date.hijri.date,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return null;
  }
};

// Get prayer times by city
export const getPrayerTimesByCity = async (city, country, method = 2) => {
  try {
    const today = new Date();
    const timestamp = Math.floor(today.getTime() / 1000);
    
    const response = await axios.get(`${BASE_URL}/timingsByCity/${timestamp}`, {
      params: {
        city,
        country,
        method,
      }
    });

    if (response.data.code === 200) {
      const timings = response.data.data.timings;
      return {
        Fajr: timings.Fajr,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
        Sunrise: timings.Sunrise,
        date: response.data.data.date.readable,
        hijriDate: response.data.data.date.hijri.date,
        city: response.data.data.meta.timezone,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching prayer times by city:', error);
    return null;
  }
};

// Get Hijri calendar date
export const getHijriDate = async () => {
  try {
    const today = new Date();
    const timestamp = Math.floor(today.getTime() / 1000);
    
    const response = await axios.get(`${BASE_URL}/gToH/${timestamp}`);
    
    if (response.data.code === 200) {
      return response.data.data.hijri;
    }
    return null;
  } catch (error) {
    console.error('Error fetching Hijri date:', error);
    return null;
  }
};

// Get Qibla direction
export const getQiblaDirection = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${BASE_URL}/qibla/${latitude}/${longitude}`);
    
    if (response.data.code === 200) {
      return response.data.data.direction;
    }
    return null;
  } catch (error) {
    console.error('Error fetching Qibla direction:', error);
    return null;
  }
};

// Get current Islamic month and year
export const getCurrentIslamicDate = async () => {
  try {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    
    const response = await axios.get(`${BASE_URL}/gToH/${day}-${month}-${year}`);
    
    if (response.data.code === 200) {
      const hijri = response.data.data.hijri;
      return {
        day: hijri.day,
        month: hijri.month.en,
        monthNumber: hijri.month.number,
        year: hijri.year,
        designation: hijri.designation.abbreviated,
        fullDate: `${hijri.day} ${hijri.month.en} ${hijri.year} ${hijri.designation.abbreviated}`
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching Islamic date:', error);
    return null;
  }
};

// Get user's location
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

// Get Surah by number with Arabic text and English translation
// Uses backend API to bypass CORS issues
export const getSurahByNumber = async (surahNumber) => {
  try {
    console.log(`Fetching Surah ${surahNumber} from backend...`);
    
    // Call our backend API instead of external API
    const response = await axios.get(`/api/islamic/surah/${surahNumber}`);
    
    console.log('Backend response:', response.data);
    
    if (response.data.success && response.data.data) {
      const surahData = response.data.data;
      
      // Transform backend response to match frontend expectations
      const ayahs = surahData.ayahs.map((ayah) => ({
        number: ayah.number,
        numberInSurah: ayah.number,
        text: ayah.arabic, // Arabic text
        translation: ayah.translation // English translation
      }));
      
      console.log(`Successfully loaded ${ayahs.length} verses`);
      
      return {
        number: surahData.number,
        name: surahData.arabicName,
        englishName: surahData.name,
        englishNameTranslation: surahData.englishNameTranslation,
        numberOfAyahs: surahData.numberOfAyahs,
        revelationType: surahData.revelationType,
        ayahs: ayahs
      };
    }
    
    console.error('Backend returned unsuccessful response');
    return null;
  } catch (error) {
    console.error('Error fetching surah from backend:', error);
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return null;
  }
};

