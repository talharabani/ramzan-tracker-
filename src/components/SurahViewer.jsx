import { useState } from 'react';
import api from '../config/api';

const SurahViewer = ({ surahType, onComplete }) => {
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);

  const fetchSurah = async () => {
    setLoading(true);
    setIsOpen(true);
    try {
      const { data } = surahType === 'mulk' 
        ? await api.getSurahMulk()
        : await api.getSurahKahf();
      setSurah(data.data);
    } catch (error) {
      console.error('Error fetching surah:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    setIsOpen(false);
    if (onComplete) onComplete();
  };

  if (!isOpen) {
    return (
      <button
        onClick={fetchSurah}
        className="islamic-button w-full flex items-center justify-center gap-2"
      >
        <span>📖</span>
        <span>Read Surah {surahType === 'mulk' ? 'Mulk' : 'Kahf'}</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-cream-50 to-sand-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-islamic-teal to-islamic-blue p-6 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-arabic font-bold mb-1">
                {loading ? 'Loading...' : surah?.name}
              </h2>
              {surah && (
                <p className="text-sm opacity-90">
                  {surah.arabicName} • {surah.numberOfAyahs} Ayahs • {surah.revelationType}
                </p>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
            >
              ✕
            </button>
          </div>
          
          {!loading && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm"
              >
                {showTranslation ? 'Hide Translation' : 'Show Translation'}
              </button>
              <button
                onClick={handleComplete}
                className="px-4 py-2 rounded-lg bg-white text-islamic-teal hover:bg-cream-100 transition-colors text-sm font-bold"
              >
                ✓ Mark as Completed
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-islamic-teal border-t-transparent"></div>
            </div>
          ) : (
            <>
              {/* Bismillah */}
              {surah?.number !== 1 && surah?.number !== 9 && (
                <div className="text-center p-6 bg-white/60 rounded-xl border-2 border-islamic-teal/20 mb-6">
                  <p className="text-3xl font-arabic text-islamic-teal">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                  <p className="text-sm text-gray-600 mt-2 font-elegant">
                    In the name of Allah, the Most Gracious, the Most Merciful
                  </p>
                </div>
              )}

              {/* Ayahs */}
              {surah?.ayahs.map((ayah) => (
                <div
                  key={ayah.number}
                  className="bg-white/70 rounded-xl p-6 border border-sand-200/50 hover:shadow-lg transition-shadow"
                >
                  {/* Ayah Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-full bg-gradient-to-br from-islamic-teal to-islamic-blue text-white flex items-center justify-center font-bold shadow-md">
                      {ayah.number}
                    </span>
                  </div>

                  {/* Arabic Text */}
                  <div className="mb-4 p-4 bg-cream-50 rounded-lg border border-gold-200/30">
                    <p className="text-2xl md:text-3xl font-arabic text-right leading-loose text-gray-800">
                      {ayah.arabic}
                    </p>
                  </div>

                  {/* Translation */}
                  {showTranslation && ayah.translation && (
                    <div className="p-4 bg-sand-50 rounded-lg border border-sand-200">
                      <p className="text-gray-700 font-elegant leading-relaxed">
                        {ayah.translation}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* Completion Button at Bottom */}
              <div className="sticky bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cream-100 to-transparent">
                <button
                  onClick={handleComplete}
                  className="islamic-button w-full flex items-center justify-center gap-2 shadow-xl"
                >
                  <span>✓</span>
                  <span>Complete Reading & Earn Points</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurahViewer;
