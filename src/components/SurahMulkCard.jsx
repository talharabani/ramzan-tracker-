import { useState } from 'react';
import SurahReader from './SurahReader';

const SurahMulkCard = () => {
  const [showReader, setShowReader] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const benefits = [
    { icon: '🛡️', title: 'Protection from Grave Punishment', desc: 'Protects from the punishment of the grave' },
    { icon: '🌙', title: 'Read Every Night', desc: 'Recommended to recite before sleeping' },
    { icon: '✨', title: '30 Verses of Intercession', desc: 'Will intercede for its reciter on Day of Judgment' },
    { icon: '📖', title: 'The Savior', desc: 'Known as "Al-Munjiyah" (The Savior)' }
  ];

  return (
    <>
      <div className="islamic-card animate-fade-in bg-gradient-to-br from-islamic-emerald/5 to-islamic-gold/5 border-2 border-islamic-emerald/20 hover:border-islamic-gold/50 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-islamic-emerald to-islamic-emerald-dark flex items-center justify-center text-3xl shadow-lg">📿</div>
            <div>
              <h3 className="text-2xl font-arabic font-bold text-islamic-emerald">Surah Al-Mulk</h3>
              <p className="text-sm text-gray-600">Chapter 67 • The Sovereignty</p>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-full border-3 flex items-center justify-center transition-all cursor-pointer ${
            isCompleted ? 'bg-islamic-emerald border-islamic-emerald' : 'border-gray-300 hover:border-islamic-gold'
          }`} onClick={() => setIsCompleted(!isCompleted)}>
            {isCompleted && <span className="text-white text-2xl">✓</span>}
          </div>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-islamic-beige border-2 border-islamic-emerald/20">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🌙</span>
            <div>
              <h4 className="font-bold text-islamic-navy text-lg">When to Read</h4>
              <p className="text-sm text-islamic-navy/70">Every night before sleeping</p>
            </div>
          </div>
          <p className="text-sm text-islamic-navy leading-relaxed">
            The Prophet ﷺ said: "There is a surah in the Quran which contains thirty verses which will intercede for a man until he is forgiven. It is Surah Tabarak (Al-Mulk)."
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {benefits.map((b, i) => (
            <div key={i} className="p-3 rounded-xl bg-white border border-islamic-emerald/10 hover:border-islamic-gold/30 transition-all">
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

        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-islamic-gold/10 to-islamic-emerald/10 border-l-4 border-islamic-gold">
          <p className="text-sm text-islamic-navy italic leading-relaxed">
            "Whoever recites Surah Al-Mulk every night, Allah will protect him from the torment of the grave." — Hadith (Tirmidhi)
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 rounded-xl bg-islamic-emerald/10">
            <p className="text-2xl font-bold text-islamic-emerald">30</p>
            <p className="text-xs text-gray-600">Verses</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-islamic-gold/10">
            <p className="text-2xl font-bold text-islamic-gold">67</p>
            <p className="text-xs text-gray-600">Chapter</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-islamic-navy/10">
            <p className="text-2xl font-bold text-islamic-navy">Makki</p>
            <p className="text-xs text-gray-600">Revelation</p>
          </div>
        </div>

        <button
          onClick={() => setShowReader(true)}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-islamic-emerald to-islamic-emerald-light text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
        >
          📖 Read Surah Al-Mulk
        </button>

        {isCompleted && (
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-islamic-gold/20 to-islamic-emerald/20 text-center animate-fade-in">
            <p className="text-sm font-bold text-islamic-emerald">✓ Masha'Allah! May Allah accept your recitation</p>
          </div>
        )}
      </div>

      {showReader && <SurahReader surahNumber={67} surahName="Surah Al-Mulk" onClose={() => setShowReader(false)} />}
    </>
  );
};

export default SurahMulkCard;
