import { useState, useEffect } from 'react';

const DailyAyah = () => {
  const [ayah, setAyah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showArabic, setShowArabic] = useState(false);

  // Sample Ayahs - In production, fetch from API
  const ayahs = [
    {
      arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      translation: "Indeed, with hardship comes ease.",
      reference: "Quran 94:6",
      surah: "Ash-Sharh",
      verse: 6
    },
    {
      arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
      translation: "So remember Me; I will remember you.",
      reference: "Quran 2:152",
      surah: "Al-Baqarah",
      verse: 152
    },
    {
      arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ",
      translation: "And do not despair of the mercy of Allah.",
      reference: "Quran 12:87",
      surah: "Yusuf",
      verse: 87
    },
    {
      arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
      translation: "Indeed, Allah is with the patient.",
      reference: "Quran 2:153",
      surah: "Al-Baqarah",
      verse: 153
    },
    {
      arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
      translation: "And whoever fears Allah - He will make for him a way out.",
      reference: "Quran 65:2",
      surah: "At-Talaq",
      verse: 2
    }
  ];

  useEffect(() => {
    fetchDailyAyah();
  }, []);

  const fetchDailyAyah = () => {
    try {
      // Get today's date and use it to select an ayah
      const today = new Date();
      const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
      const ayahIndex = dayOfYear % ayahs.length;
      
      setAyah(ayahs[ayahIndex]);
    } catch (error) {
      console.error('Error fetching daily ayah:', error);
      setAyah(ayahs[0]); // Fallback
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="islamic-card animate-pulse">
        <div className="h-48 bg-islamic-beige-dark rounded-lg"></div>
      </div>
    );
  }

  if (!ayah) return null;

  return (
    <div className="islamic-card bg-gradient-to-br from-islamic-navy/5 to-islamic-emerald/5 border-2 border-islamic-emerald/20 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-islamic-emerald to-islamic-navy flex items-center justify-center flex-shrink-0 shadow-lg">
          <span className="text-3xl">📖</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-arabic font-bold text-islamic-emerald">
              Daily Ayah
            </h3>
            <button
              onClick={() => setShowArabic(!showArabic)}
              className="text-sm px-4 py-2 rounded-xl bg-islamic-emerald/10 text-islamic-emerald hover:bg-islamic-emerald/20 transition-colors font-medium"
            >
              {showArabic ? 'Hide Arabic' : 'Show Arabic'}
            </button>
          </div>

          {/* Arabic Text */}
          {showArabic && (
            <div className="mb-6 p-6 bg-islamic-beige-light rounded-2xl border-2 border-islamic-gold/20 animate-slide-up">
              <p className="text-3xl font-arabic text-right leading-loose text-islamic-navy">
                {ayah.arabic}
              </p>
            </div>
          )}

          {/* English Translation */}
          <div className="mb-4 p-6 bg-white rounded-2xl border border-islamic-emerald/10 shadow-sm">
            <p className="text-xl text-gray-800 leading-relaxed mb-4 italic">
              "{ayah.translation}"
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-islamic-emerald/10">
              <span className="text-sm font-medium text-islamic-emerald">
                {ayah.reference}
              </span>
              <span className="text-sm text-gray-600">
                Surah {ayah.surah}, Verse {ayah.verse}
              </span>
            </div>
          </div>

          {/* Reflection Prompt */}
          <div className="p-4 bg-gradient-to-r from-islamic-gold/10 to-islamic-emerald/10 rounded-xl border border-islamic-gold/20">
            <p className="text-sm text-gray-700 italic flex items-center gap-2">
              <span className="text-xl">💭</span>
              Reflect on this verse throughout your day and let it guide your actions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyAyah;
