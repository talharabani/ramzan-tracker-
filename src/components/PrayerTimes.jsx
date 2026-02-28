import { useState, useEffect } from 'react';
import { getPrayerTimes, getUserLocation, getCurrentIslamicDate } from '../services/islamicApi';

const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [islamicDate, setIslamicDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Loading...');

  const prayerIcons = {
    Fajr: '🌅',
    Dhuhr: '☀️',
    Asr: '🌤️',
    Maghrib: '🌆',
    Isha: '🌙'
  };

  useEffect(() => {
    fetchPrayerTimes();
    fetchIslamicDate();
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      const userLocation = await getUserLocation();
      const times = await getPrayerTimes(userLocation.latitude, userLocation.longitude);
      
      if (times) {
        setPrayerTimes(times);
        setLocation('Your Location');
      }
    } catch (error) {
      console.log('Using default location');
      const times = await getPrayerTimes(21.4225, 39.8262); // Mecca
      if (times) {
        setPrayerTimes(times);
        setLocation('Mecca, Saudi Arabia');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchIslamicDate = async () => {
    const date = await getCurrentIslamicDate();
    if (date) {
      setIslamicDate(date);
    }
  };

  // Convert time string (HH:MM) to minutes since midnight
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  useEffect(() => {
    if (!prayerTimes) return;

    const calculateNextPrayer = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      const prayerMinutes = prayers.map(prayer => ({
        name: prayer,
        minutes: timeToMinutes(prayerTimes[prayer])
      }));

      // Find next prayer
      let nextPrayerData = null;
      let minutesUntilNext = 0;

      for (const prayer of prayerMinutes) {
        if (prayer.minutes > currentMinutes) {
          nextPrayerData = prayer;
          minutesUntilNext = prayer.minutes - currentMinutes;
          break;
        }
      }

      // If no prayer found today, next prayer is Fajr tomorrow
      if (!nextPrayerData) {
        nextPrayerData = prayerMinutes[0]; // Fajr
        minutesUntilNext = (24 * 60 - currentMinutes) + prayerMinutes[0].minutes;
      }

      setNextPrayer(nextPrayerData.name);
      
      const hoursLeft = Math.floor(minutesUntilNext / 60);
      const minutesLeft = minutesUntilNext % 60;
      setTimeRemaining(`${hoursLeft}h ${minutesLeft}m`);
    };

    calculateNextPrayer();
    const interval = setInterval(calculateNextPrayer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [prayerTimes]);

  if (loading) {
    return (
      <div className="islamic-card animate-pulse">
        <div className="h-8 bg-islamic-beige-dark rounded w-1/3 mb-4"></div>
        <div className="h-32 bg-islamic-beige-dark rounded mb-4"></div>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-20 bg-islamic-beige-dark rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!prayerTimes) {
    return (
      <div className="islamic-card">
        <p className="text-center text-gray-600">Unable to load prayer times</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Next Prayer - Large Highlighted Card */}
      {nextPrayer && (
        <div className="islamic-card next-prayer-glow bg-gradient-to-br from-islamic-emerald/5 to-islamic-gold/5 animate-fade-in">
          <div className="text-center mb-4">
            <p className="text-sm font-medium text-islamic-emerald/70 mb-2">NEXT PRAYER</p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-6xl">{prayerIcons[nextPrayer]}</span>
              <div>
                <h2 className="text-5xl font-arabic font-bold text-islamic-emerald mb-1">
                  {nextPrayer}
                </h2>
                <p className="text-3xl font-bold text-islamic-navy">
                  {prayerTimes[nextPrayer]}
                </p>
              </div>
            </div>
            <div className="inline-block px-6 py-3 bg-islamic-gold/20 rounded-2xl border-2 border-islamic-gold/30">
              <p className="text-sm text-islamic-emerald font-medium mb-1">Time Remaining</p>
              <p className="text-4xl font-bold text-islamic-gold">{timeRemaining}</p>
            </div>
          </div>

          {/* Mosque silhouette decoration */}
          <div className="mosque-silhouette h-16 opacity-30"></div>
        </div>
      )}

      {/* All Prayer Times */}
      <div className="islamic-card animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-arabic font-bold text-islamic-emerald flex items-center gap-2">
              <span className="text-3xl">🕌</span>
              Prayer Times
            </h3>
            <p className="text-sm text-gray-600 mt-1">{location}</p>
          </div>
          {islamicDate && (
            <div className="text-right">
              <p className="text-xs text-gray-600">Islamic Date</p>
              <p className="text-lg font-arabic font-bold text-islamic-emerald">
                {islamicDate.day} {islamicDate.month}
              </p>
              <p className="text-xs text-gray-600">{islamicDate.year} {islamicDate.designation}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-5 gap-3">
          {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((prayer) => (
            <div
              key={prayer}
              className={`text-center p-4 rounded-2xl transition-all duration-300 ${
                nextPrayer === prayer
                  ? 'bg-islamic-emerald text-white shadow-lg scale-105'
                  : 'bg-islamic-beige-light border border-islamic-emerald/10 hover:border-islamic-gold/30'
              }`}
            >
              <div className="text-3xl mb-2">{prayerIcons[prayer]}</div>
              <p className={`text-sm font-medium mb-1 ${
                nextPrayer === prayer ? 'text-white' : 'text-islamic-emerald'
              }`}>
                {prayer}
              </p>
              <p className={`text-base font-bold ${
                nextPrayer === prayer ? 'text-white' : 'text-islamic-navy'
              }`}>
                {prayerTimes[prayer]}
              </p>
            </div>
          ))}
        </div>

        {prayerTimes.Sunrise && (
          <div className="mt-4 text-center p-3 bg-islamic-gold/10 rounded-xl border border-islamic-gold/20">
            <p className="text-sm text-gray-700">
              Sunrise: <span className="font-bold text-islamic-gold">{prayerTimes.Sunrise}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayerTimes;
