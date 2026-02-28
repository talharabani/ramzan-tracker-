import { useState, useEffect } from 'react';
import { getSurahByNumber } from '../services/islamicApi';

const SurahReader = ({ surahNumber, surahName, onClose }) => {
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const versesPerPage = 10;

  useEffect(() => {
    fetchSurah();
  }, [surahNumber]);

  const fetchSurah = async () => {
    setLoading(true);
    try {
      const data = await getSurahByNumber(surahNumber);
      setSurahData(data);
    } catch (error) {
      console.error('Error fetching surah:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="islamic-card max-w-4xl w-full">
          <div className="flex justify-center py-12">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!surahData) {
    return null;
  }

  const totalPages = Math.ceil(surahData.ayahs.length / versesPerPage);
  const startIndex = (currentPage - 1) * versesPerPage;
  const endIndex = startIndex + versesPerPage;
  const currentAyahs = surahData.ayahs.slice(startIndex, endIndex);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="islamic-card max-w-4xl w-full my-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-islamic-emerald/20">
          <div>
            <h2 className="text-3xl font-arabic font-bold text-islamic-emerald mb-2">
              {surahData.englishName} - {surahData.name}
            </h2>
            <p className="text-sm text-gray-600">
              {surahData.englishNameTranslation} • {surahData.numberOfAyahs} Ayahs • {surahData.revelationType}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Bismillah */}
        {surahNumber !== 1 && surahNumber !== 9 && (
          <div className="text-center mb-8 p-6 bg-islamic-beige rounded-xl">
            <p className="text-4xl font-arabic text-islamic-emerald">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-sm text-gray-600 mt-2">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>
        )}

        {/* Ayahs */}
        <div className="space-y-6 mb-6">
          {currentAyahs.map((ayah) => (
            <div
              key={ayah.number}
              className="p-6 rounded-xl bg-white border-2 border-islamic-emerald/10 hover:border-islamic-gold/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-islamic-emerald to-islamic-gold flex items-center justify-center text-white font-bold flex-shrink-0">
                  {ayah.numberInSurah}
                </div>
                <div className="flex-1">
                  <p className="text-3xl font-arabic text-islamic-navy mb-4 text-right leading-loose">
                    {ayah.text}
                  </p>
                  {ayah.translation && (
                    <p className="text-gray-700 leading-relaxed">
                      {ayah.translation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-islamic-emerald text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-islamic-emerald-light transition-colors"
            >
              ← Previous
            </button>
            <span className="px-4 py-2 text-islamic-navy font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl bg-islamic-emerald text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-islamic-emerald-light transition-colors"
            >
              Next →
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t-2 border-islamic-emerald/20 text-center">
          <p className="text-sm text-gray-600">
            📖 Read with focus and reflection • May Allah accept your recitation
          </p>
        </div>
      </div>
    </div>
  );
};

export default SurahReader;
