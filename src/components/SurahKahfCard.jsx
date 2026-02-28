import { useState, useEffect } from 'react';
import SurahReader from './SurahReader';

const SurahKahfCard = () => {
  const [showReader, setShowReader] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFriday, setIsFriday] = useState(false);

  useEffect(() => {
    const today = new Date().getDay();
    setIsFriday(today === 5);
  }, []);

  const benefits = [
    { icon: '💡', title: 'Light Between Two Fridays', desc: 'Illuminates the path from one Friday to the next' },
    { icon: '🕌', title: 'Read on Friday', desc: 'Special blessings when recited on Jumu\'ah' },
    { icon: '🛡️', title: 'Protection from Dajjal', desc: 'First 10 verses protect from the Antichrist' },
    { icon: '✨', title: 'Forgiveness of Sins', desc: 'Sins are forgiven between two Fridays' }
  ];

  return (
    <>
      <div className={`islamic-card animate-fade-in bg-gradient-to-br from-islamic-gold/5 to-islamic-navy/5 border-2 transition-all duration-300 ${
        isFriday ? 'border-islamic-gold shadow-xl shadow-islamic-gold/20 next-prayer-glow' : 'border-islamic-navy/20 hover:border-islamic-gold/50'
      }`}>
        {isFriday && (
          <div className="absolute -top-3 -right-3 px-4 py-2 rounded-full bg-gradient-to-r from-islamic-gold to-islamic-gold-light text-white text-sm font-bold shadow-lg animate-pulse z-10">
            🕌 Today is Friday!
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-islamic-gold to-islamic-gold-dark flex items-center justify-center text-3xl shadow-lg">📜</div>
            <div>
              <h3 className="text-2xl font-arabic font-bold text-islamic-gold">Surah Al-Kahf</h3>
              <p className="text-sm text-gray-600">Chapter 18 • The Cave</p>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-full border-3 flex items-center justify-center transition-all cursor-pointer ${
            isCompleted ? 'bg-islamic-gold border-islamic-gold' : 'border-gray-300 hover:border-islamic-gold'
          }`} onClick={() => setIsCompleted(!isCompleted)}>
            {isCompleted && <span className="text-white text-2xl">✓</span>}
          </div>
        </div>

        <div className={`mb-6 p-4 rounded-xl border-2 transition-all ${
          isFriday ? 'bg-gradient-to-r from-islamic-gold/20 to-islamic-gold/10 border-islamic-gold animate-pulse' : 'bg-islamic-beige border-islamic-gold/20'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🕌</span>
            <div>
              <h4 className="font-bold text-islamic-navy text-lg">When to Read</h4>
              <p className="text-sm text-islamic-navy/70">{isFriday ? 'Perfect time - Today is Friday!' : 'Every Friday (Jumu\'ah)'}</p>
            </div>
          </div>
          <p className="text-sm text-islamic-navy leading-relaxed">
            The Prophet ﷺ said: "Whoever reads Surah Al-Kahf on Friday, a light will shine for him between the two Fridays."
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {benefits.map((b, i) => (
            <div key={i} className="p-3 rounded-xl bg-white border border-islamic-gold/10 hover:border-islamic-gold/30 transition-all">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{b.icon}</span>
                <div>
                  <h5 className="font-bold text-islamic-navy text-sm mb-1">{b.title}</h5>
                  <p className="text-xs text-gray-600">{b.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-islamic-emerald/10 to-islamic-gold/10 border-l-4 border-islamic-emerald">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <h5 className="font-bold text-islamic-navy mb-2">Special Protection</h5>
              <p className="text-sm text-islamic-navy leading-relaxed">
                "Whoever memorizes the first ten verses of Surah Al-Kahf will be protected from the Dajjal (Antichrist)." — Hadith (Muslim)
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 rounded-xl bg-islamic-gold/10">
            <p className="text-2xl font-bold text-islamic-gold">110</p>
            <p className="text-xs text-gray-600">Verses</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-islamic-emerald/10">
            <p className="text-2xl font-bold text-islamic-emerald">18</p>
            <p className="text-xs text-gray-600">Chapter</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-islamic-navy/10">
            <p className="text-2xl font-bold text-islamic-navy">Makki</p>
            <p className="text-xs text-gray-600">Revelation</p>
          </div>
        </div>

        <button
          onClick={() => setShowReader(true)}
          className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 ${
            isFriday ? 'bg-gradient-to-r from-islamic-gold to-islamic-gold-light text-white animate-pulse' : 'bg-gradient-to-r from-islamic-gold to-islamic-gold-dark text-white'
          }`}
        >
          📖 Read Surah Al-Kahf {isFriday && '(Friday Special!)'}
        </button>

        {isCompleted && (
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-islamic-gold/20 to-islamic-emerald/20 text-center animate-fade-in">
            <p className="text-sm font-bold text-islamic-emerald">✓ Masha'Allah! May Allah illuminate your path</p>
          </div>
        )}
      </div>

      {showReader && <SurahReader surahNumber={18} surahName="Surah Al-Kahf" onClose={() => setShowReader(false)} />}
    </>
  );
};

export default SurahKahfCard;
