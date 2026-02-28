// Enhanced Tasks Configuration with Dynamic Features
// Tasks are now integrated with Islamic APIs for richer functionality

export const TASKS = {
  necessary: [
    { 
      id: 'supara_1', 
      name: '1 Supara', 
      points: 10, 
      icon: '📖',
      description: 'Complete reading 1 Supara (Juz) of the Quran today',
      category: 'quran'
    },
    { 
      id: 'namaz_5', 
      name: '5 Namaz', 
      points: 10, 
      icon: '🕌',
      description: 'Complete all 5 daily prayers',
      category: 'prayer'
    },
    { 
      id: 'islamic_video', 
      name: '1 Islamic Video', 
      points: 10, 
      icon: '📺',
      description: 'Watch an Islamic lecture or educational video',
      category: 'learning'
    },
    { 
      id: 'surah_mulk', 
      name: 'Surah Mulk', 
      points: 10, 
      icon: '📿',
      description: 'Recite Surah Al-Mulk (Chapter 67) - Protection from grave punishment',
      category: 'quran',
      hasViewer: true // Opens Surah viewer
    },
    { 
      id: 'ayat_tafseer', 
      name: '5 Ayat Tafseer', 
      points: 10, 
      icon: '📚',
      description: 'Study and understand the tafseer of 5 Quranic verses',
      category: 'learning',
      usesAPI: true // Fetches random ayahs from API
    },
    { 
      id: 'azkar', 
      name: 'Morning & Evening Azkar', 
      points: 10, 
      icon: '🤲',
      description: 'Complete morning and evening remembrance (Adhkar)',
      category: 'dhikr'
    },
    { 
      id: 'pray_on_time', 
      name: 'Pray on Time', 
      points: 15, 
      icon: '⏰',
      description: 'Perform all 5 prayers within their designated time',
      category: 'prayer',
      bonus: true,
      smartUnlock: true // Auto-unlocks based on prayer tracking
    }
  ],
  extra: [
    { 
      id: 'supara_2', 
      name: '2 Supara', 
      points: 20, 
      icon: '📖',
      description: 'Complete reading 2 Suparas (Juz) of the Quran',
      category: 'quran'
    },
    { 
      id: 'taraweeh', 
      name: '8 Taraweeh', 
      points: 10, 
      icon: '🌙',
      description: 'Pray 8 Rakats of Taraweeh (Ramadan night prayer)',
      category: 'prayer'
    },
    { 
      id: 'tahajjud', 
      name: 'Tahajjud', 
      points: 5, 
      icon: '✨',
      description: 'Wake up and pray Tahajjud (late night voluntary prayer)',
      category: 'prayer'
    },
    { 
      id: 'tasbeeh', 
      name: 'Tasbeeh 100', 
      points: 5, 
      icon: '📿',
      description: 'Recite Subhanallah, Alhamdulillah, Allahu Akbar 100 times each',
      category: 'dhikr'
    },
    { 
      id: 'surah_kahf', 
      name: 'Surah Kahf Friday', 
      points: 5, 
      icon: '📜',
      description: 'Recite Surah Al-Kahf (Chapter 18) on Friday - Light between two Fridays',
      category: 'quran',
      hasViewer: true, // Opens Surah viewer
      fridayOnly: true, // Highlighted on Fridays
      smartHighlight: true // Auto-highlights on Friday
    },
    { 
      id: 'parents_service', 
      name: 'Parents Service', 
      points: 10, 
      icon: '❤️',
      description: 'Do something kind and helpful for your parents',
      category: 'character'
    },
    { 
      id: 'explain_hadith', 
      name: 'Explain Hadith', 
      points: 5, 
      icon: '💬',
      description: 'Study and explain one hadith in your own words',
      category: 'learning',
      usesAPI: true // Shows daily hadith from API
    }
  ]
};

export const BONUS_POINTS = 50;
export const STREAK_REQUIRED_TASKS = 5;

// Helper functions for smart task features
export const getTaskEnhancements = (taskId, isFriday, prayerTracking) => {
  const task = [...TASKS.necessary, ...TASKS.extra].find(t => t.id === taskId);
  if (!task) return null;

  const enhancements = {
    highlighted: false,
    autoUnlocked: false,
    message: null,
    badge: null
  };

  // Friday special for Surah Kahf
  if (taskId === 'surah_kahf' && isFriday) {
    enhancements.highlighted = true;
    enhancements.badge = '🕌 Friday Special';
    enhancements.message = 'Today is Friday! Reciting Surah Kahf brings blessings and light.';
  }

  // Auto-unlock pray on time task based on prayer tracking
  if (taskId === 'pray_on_time' && prayerTracking?.allPrayersCompleted) {
    enhancements.autoUnlocked = true;
    enhancements.message = 'Masha\'Allah! All prayers completed on time today!';
  }

  return enhancements;
};

// Get task by ID
export const getTaskById = (taskId) => {
  return [...TASKS.necessary, ...TASKS.extra].find(t => t.id === taskId);
};

// Get tasks by category
export const getTasksByCategory = (category) => {
  return [...TASKS.necessary, ...TASKS.extra].filter(t => t.category === category);
};

export default TASKS;
