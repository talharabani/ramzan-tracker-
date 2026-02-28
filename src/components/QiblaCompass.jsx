import { useState, useEffect } from 'react';
import { getQiblaDirection, getUserLocation } from '../services/islamicApi';

const QiblaCompass = () => {
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQiblaDirection();
  }, []);

  const fetchQiblaDirection = async () => {
    try {
      const location = await getUserLocation();
      const direction = await getQiblaDirection(location.latitude, location.longitude);
      
      if (direction) {
        setQiblaDirection(direction);
      } else {
        setError('Unable to fetch Qibla direction');
      }
    } catch (err) {
      setError('Location access denied. Please enable location services.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="islamic-card animate-pulse">
        <div className="h-8 bg-sand-200 rounded w-1/3 mb-4"></div>
        <div className="h-48 bg-sand-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="islamic-card">
        <h3 className="text-xl font-arabic font-bold text-islamic-teal mb-4 flex items-center gap-2">
          <span className="text-2xl">🧭</span>
          Qibla Direction
        </h3>
        <p className="text-sm text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="islamic-card">
      <h3 className="text-xl font-arabic font-bold text-islamic-teal mb-4 flex items-center gap-2">
        <span className="text-2xl">🧭</span>
        Qibla Direction
      </h3>

      <div className="relative w-48 h-48 mx-auto">
        {/* Compass Circle */}
        <div className="absolute inset-0 rounded-full border-4 border-sand-200 bg-gradient-to-br from-cream-50 to-sand-100"></div>
        
        {/* Direction Markers */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute top-2 text-sm font-bold text-gray-700">N</div>
          <div className="absolute right-2 text-sm font-bold text-gray-700">E</div>
          <div className="absolute bottom-2 text-sm font-bold text-gray-700">S</div>
          <div className="absolute left-2 text-sm font-bold text-gray-700">W</div>
        </div>

        {/* Qibla Arrow */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-transform duration-1000"
          style={{ transform: `rotate(${qiblaDirection}deg)` }}
        >
          <div className="text-6xl">
            ☪️
          </div>
        </div>

        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-islamic-teal"></div>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">Qibla Direction</p>
        <p className="text-3xl font-bold text-islamic-teal">{Math.round(qiblaDirection)}°</p>
        <p className="text-xs text-gray-500 mt-2">
          Point your device towards the Kaaba
        </p>
      </div>
    </div>
  );
};

export default QiblaCompass;
