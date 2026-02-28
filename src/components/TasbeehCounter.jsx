import { useState } from 'react';

const TasbeehCounter = () => {
  const [counts, setCounts] = useState({
    subhanallah: 0,
    alhamdulillah: 0,
    allahuakbar: 0
  });
  const [activeZikr, setActiveZikr] = useState('subhanallah');
  const [showConfetti, setShowConfetti] = useState(false);

  const zikrData = {
    subhanallah: {
      arabic: 'سُبْحَانَ اللَّهِ',
      transliteration: 'Subhanallah',
      translation: 'Glory be to Allah',
      color: 'from-islamic-emerald to-islamic-emerald-light',
      target: 33
    },
    alhamdulillah: {
      arabic: 'الْحَمْدُ لِلَّهِ',
      transliteration: 'Alhamdulillah',
      translation: 'All praise is due to Allah',
      color: 'from-islamic-gold to-islamic-gold-light',
      target: 33
    },
    allahuakbar: {
      arabic: 'اللَّهُ أَكْبَرُ',
      transliteration: 'Allahu Akbar',
      translation: 'Allah is the Greatest',
      color: 'from-islamic-navy to-islamic-navy-light',
      target: 34
    }
  };

  const currentZikr = zikrData[activeZikr];
  const currentCount = counts[activeZikr];
  const progress = (currentCount / currentZikr.target) * 100;
  const totalCount = counts.subhanallah + counts.alhamdulillah + counts.allahuakbar;
  const allComplete = counts.subhanallah >= 33 && counts.alhamdulillah >= 33 && counts.allahuakbar >= 34;

  const handleIncrement = () => {
    if (currentCount < currentZikr.target) {
      setCounts(prev => ({
        ...prev,
        [activeZikr]: prev[activeZikr] + 1
      }));

      if (currentCount + 1 === currentZikr.target) {
        if (activeZikr === 'subhanallah' && counts.alhamdulillah < 33) {
          setTimeout(() => setActiveZikr('alhamdulillah'), 500);
        } else if (activeZikr === 'alhamdulillah' && counts.allahuakbar < 34) {
          setTimeout(() => setActiveZikr('allahuakbar'), 500);
        } else if (activeZikr === 'allahuakbar' || allComplete) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      }
    }
  };

  const handleReset = () => {
    setCounts({
      subhanallah: 0,
      alhamdulillah: 0,
      allahuakbar: 0
    });
    setActiveZikr('subhanallah');
    setShowConfetti(false);
  };

  return (
    <div className="islamic-card animate-fade-in relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-islamic-gold/20 to-islamic-emerald/20 animate-pulse"></div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-arabic font-bold text-islamic-emerald flex items-center gap-2">
          <span className="text-3xl">📿</span>
          Tasbeeh Counter
        </h3>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="mb-6 p-4 rounded-xl bg-islamic-beige">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-islamic-navy">Total Progress</span>
          <span className="text-2xl font-bold text-islamic-gold">{totalCount}/100</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-islamic-emerald via-islamic-gold to-islamic-navy transition-all duration-500"
            style={{ width: `${(totalCount / 100) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {Object.keys(zikrData).map((key) => {
          const zikr = zikrData[key];
          const count = counts[key];
          const isComplete = count >= zikr.target;
          const isActive = activeZikr === key;

          return (
            <button
              key={key}
              onClick={() => setActiveZikr(key)}
              className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-br ${zikr.color} text-white border-transparent shadow-lg scale-105`
                  : isComplete
                  ? 'bg-green-50 border-green-300 text-green-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-islamic-gold'
              }`}
            >
              <div className="text-xs font-medium mb-1">{zikr.transliteration}</div>
              <div className="text-lg font-bold">
                {count}/{zikr.target}
              </div>
              {isComplete && <div className="text-xs mt-1">✓ Complete</div>}
            </button>
          );
        })}
      </div>

      <div className="text-center mb-6 p-6 rounded-xl bg-gradient-to-br from-islamic-beige to-white">
        <p className="text-5xl font-arabic text-islamic-navy mb-3 leading-relaxed">
          {currentZikr.arabic}
        </p>
        <p className="text-xl font-medium text-islamic-emerald mb-2">
          {currentZikr.transliteration}
        </p>
        <p className="text-sm text-gray-600 italic">
          {currentZikr.translation}
        </p>
      </div>

      <div className="text-center mb-6">
        <div className={`inline-block px-8 py-6 rounded-2xl bg-gradient-to-br ${currentZikr.color} text-white shadow-xl`}>
          <div className="text-7xl font-bold mb-2">{currentCount}</div>
          <div className="text-sm opacity-90">of {currentZikr.target}</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${currentZikr.color} transition-all duration-300`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <button
        onClick={handleIncrement}
        disabled={currentCount >= currentZikr.target}
        className={`w-full py-6 rounded-2xl font-bold text-xl transition-all duration-300 ${
          currentCount >= currentZikr.target
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : `bg-gradient-to-r ${currentZikr.color} text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95`
        }`}
      >
        {currentCount >= currentZikr.target ? '✓ Complete' : 'Tap to Count'}
      </button>

      {allComplete && (
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-islamic-gold/20 to-islamic-emerald/20 text-center animate-pulse">
          <p className="text-lg font-bold text-islamic-emerald mb-1">
            🎉 Masha'Allah! All Tasbeeh Complete!
          </p>
          <p className="text-sm text-islamic-navy">
            May Allah accept your dhikr and grant you His blessings
          </p>
        </div>
      )}
    </div>
  );
};

export default TasbeehCounter;
