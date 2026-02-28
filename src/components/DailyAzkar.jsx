import { useState } from 'react';

const DailyAzkar = () => {
  const [activeTab, setActiveTab] = useState('morning');
  const [completedAzkar, setCompletedAzkar] = useState({
    morning: [],
    evening: []
  });

  const azkarData = {
    morning: [
      {
        id: 1,
        arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ',
        transliteration: 'Asbahna wa asbahal-mulku lillah',
        translation: 'We have entered morning and the dominion belongs to Allah',
        count: 1
      },
      {
        id: 2,
        arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا',
        transliteration: 'Allahumma bika asbahna wa bika amsayna',
        translation: 'O Allah, by You we enter morning and by You we enter evening',
        count: 1
      },
      {
        id: 3,
        arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
        transliteration: 'Subhanallahi wa bihamdihi',
        translation: 'Glory be to Allah and praise Him',
        count: 100
      },
      {
        id: 4,
        arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
        transliteration: 'Astaghfirullah wa atubu ilayh',
        translation: 'I seek forgiveness from Allah and repent to Him',
        count: 100
      }
    ],
    evening: [
      {
        id: 5,
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ',
        transliteration: 'Amsayna wa amsal-mulku lillah',
        translation: 'We have entered evening and the dominion belongs to Allah',
        count: 1
      },
      {
        id: 6,
        arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا',
        transliteration: 'Allahumma bika amsayna wa bika asbahna',
        translation: 'O Allah, by You we enter evening and by You we enter morning',
        count: 1
      },
      {
        id: 7,
        arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
        transliteration: 'Subhanallahi wa bihamdihi',
        translation: 'Glory be to Allah and praise Him',
        count: 100
      },
      {
        id: 8,
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
        transliteration: 'La ilaha illallahu wahdahu la sharika lah',
        translation: 'There is no god but Allah alone, with no partner',
        count: 10
      }
    ]
  };

  const toggleAzkar = (id) => {
    setCompletedAzkar(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].includes(id)
        ? prev[activeTab].filter(azkarId => azkarId !== id)
        : [...prev[activeTab], id]
    }));
  };

  const currentAzkar = azkarData[activeTab];
  const completedCount = completedAzkar[activeTab].length;
  const totalCount = currentAzkar.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="islamic-card animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-arabic font-bold text-islamic-emerald flex items-center gap-2">
          <span className="text-3xl">🤲</span>
          Daily Azkar
        </h3>
        <div className="text-sm font-bold text-islamic-gold">
          {completedCount}/{totalCount}
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('morning')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
            activeTab === 'morning'
              ? 'bg-gradient-to-r from-islamic-emerald to-islamic-emerald-light text-white shadow-md'
              : 'bg-islamic-beige text-islamic-navy hover:bg-islamic-emerald/10'
          }`}
        >
          🌅 Morning
        </button>
        <button
          onClick={() => setActiveTab('evening')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
            activeTab === 'evening'
              ? 'bg-gradient-to-r from-islamic-navy to-islamic-navy-light text-white shadow-md'
              : 'bg-islamic-beige text-islamic-navy hover:bg-islamic-navy/10'
          }`}
        >
          🌙 Evening
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-islamic-emerald to-islamic-gold transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Azkar List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {currentAzkar.map((azkar) => {
          const isCompleted = completedAzkar[activeTab].includes(azkar.id);
          return (
            <div
              key={azkar.id}
              onClick={() => toggleAzkar(azkar.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                isCompleted
                  ? 'bg-islamic-emerald/10 border-islamic-emerald'
                  : 'bg-white border-gray-200 hover:border-islamic-gold'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-2xl font-arabic text-islamic-navy mb-2 text-right leading-relaxed">
                    {azkar.arabic}
                  </p>
                  <p className="text-sm text-gray-600 italic mb-1">
                    {azkar.transliteration}
                  </p>
                  <p className="text-sm text-islamic-navy">
                    {azkar.translation}
                  </p>
                </div>
                <div className="ml-4 flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-islamic-emerald border-islamic-emerald'
                      : 'border-gray-300'
                  }`}>
                    {isCompleted && <span className="text-white text-xl">✓</span>}
                  </div>
                  <span className="text-xs font-bold text-islamic-gold">
                    ×{azkar.count}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {progress === 100 && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-islamic-gold/20 to-islamic-emerald/20 text-center">
          <p className="text-lg font-bold text-islamic-emerald">
            🎉 Masha'Allah! {activeTab === 'morning' ? 'Morning' : 'Evening'} Azkar Complete!
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyAzkar;
