import { useState, useEffect } from 'react';
import api from '../config/api';

const DailyHadith = () => {
  const [hadith, setHadith] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showArabic, setShowArabic] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchDailyHadith();
  }, []);

  const fetchDailyHadith = async () => {
    try {
      const { data } = await api.getDailyHadith();
      // Handle different response structures
      const hadithData = data.data || data.hadith || data;
      setHadith(hadithData);
    } catch (error) {
      console.error('Error fetching daily hadith:', error);
      // Set a fallback hadith
      setHadith({
        english: "The best among you are those who have the best manners and character.",
        reference: "Sahih Bukhari",
        bookName: "Sahih Bukhari",
        category: "general"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const text = `"${hadith.english}"\n\n- ${hadith.reference}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (error) {
        copyToClipboard(text);
      }
    } else {
      copyToClipboard(text);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="islamic-card animate-pulse">
        <div className="h-48 bg-islamic-blue/10 rounded-lg"></div>
      </div>
    );
  }

  if (!hadith) return null;

  const getCategoryColor = (category) => {
    const colors = {
      salah: 'bg-islamic-teal/10 text-islamic-teal border-islamic-teal/30',
      charity: 'bg-gold-100 text-gold-700 border-gold-300',
      patience: 'bg-purple-100 text-purple-700 border-purple-300',
      parents: 'bg-pink-100 text-pink-700 border-pink-300',
      ramadan: 'bg-islamic-blue/10 text-islamic-blue border-islamic-blue/30',
      quran: 'bg-green-100 text-green-700 border-green-300'
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <div className="islamic-card bg-gradient-to-br from-islamic-blue/5 to-purple-50 border-2 border-islamic-blue/20 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-islamic-blue to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
          <span className="text-2xl">📚</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h3 className="text-xl font-arabic font-bold text-islamic-blue">
              Daily Hadith
            </h3>
            <div className="flex items-center gap-2">
              {hadith.category && hadith.category !== 'general' && (
                <span className={`text-xs px-3 py-1 rounded-full border ${getCategoryColor(hadith.category)} font-medium`}>
                  {hadith.category.charAt(0).toUpperCase() + hadith.category.slice(1)}
                </span>
              )}
              <button
                onClick={handleShare}
                className="text-sm px-3 py-1 rounded-full bg-islamic-blue/10 text-islamic-blue hover:bg-islamic-blue/20 transition-colors flex items-center gap-1"
                title="Share hadith"
              >
                {copied ? '✓ Copied' : '📤 Share'}
              </button>
            </div>
          </div>

          {/* English Text */}
          <div className="mb-4 p-4 bg-white/70 rounded-xl border border-islamic-blue/10">
            <p className="text-gray-800 font-elegant leading-relaxed text-lg mb-3">
              "{hadith.english || hadith.text || 'No translation available'}"
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-islamic-blue/10">
              <span className="text-sm text-islamic-blue font-medium">
                {hadith.reference || 'Hadith Collection'}
              </span>
              {hadith.arabic && (
                <button
                  onClick={() => setShowArabic(!showArabic)}
                  className="text-xs text-islamic-blue hover:text-islamic-teal transition-colors font-medium"
                >
                  {showArabic ? 'Hide Arabic' : 'Show Arabic'}
                </button>
              )}
            </div>
          </div>

          {/* Arabic Text (if available and toggled) */}
          {showArabic && hadith.arabic && (
            <div className="mb-4 p-4 bg-cream-50 rounded-xl border border-gold-200/30 animate-slide-in">
              <p className="text-xl font-arabic text-right leading-loose text-gray-800">
                {hadith.arabic}
              </p>
            </div>
          )}

          {/* Book Reference */}
          {(hadith.bookName || hadith.chapterName) && (
            <div className="p-3 bg-gradient-to-r from-islamic-blue/10 to-purple-100/50 rounded-lg border border-islamic-blue/20">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-2xl">📖</span>
                <div>
                  {hadith.bookName && <p className="font-medium text-gray-800">{hadith.bookName}</p>}
                  {hadith.chapterName && <p className="text-xs text-gray-600">{hadith.chapterName}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Reflection Prompt */}
          <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200/30">
            <p className="text-sm text-gray-700 font-elegant italic">
              🤔 How can you implement the wisdom of this hadith in your daily actions?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyHadith;
