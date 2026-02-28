import Quiz from '../models/Quiz.js';
import QuizAttempt from '../models/QuizAttempt.js';
import User from '../models/User.js';

const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

export const getDailyQuiz = async (req, res) => {
  try {
    const today = getTodayDate();
    
    let quiz = await Quiz.findOne({ date: today });
    
    // If no quiz for today, get a random one and assign it to today
    if (!quiz) {
      const allQuizzes = await Quiz.find();
      if (allQuizzes.length === 0) {
        // Create default quiz if none exist
        quiz = await Quiz.create({
          question: "What is the first pillar of Islam?",
          options: ["Salah (Prayer)", "Shahada (Faith)", "Zakat (Charity)", "Sawm (Fasting)"],
          correctAnswer: 1,
          explanation: "The Shahada (declaration of faith) is the first and most fundamental pillar of Islam.",
          category: "General",
          difficulty: "Easy",
          date: today
        });
      } else {
        const randomQuiz = allQuizzes[Math.floor(Math.random() * allQuizzes.length)];
        quiz = await Quiz.create({
          question: randomQuiz.question,
          options: randomQuiz.options,
          correctAnswer: randomQuiz.correctAnswer,
          explanation: randomQuiz.explanation,
          category: randomQuiz.category,
          difficulty: randomQuiz.difficulty,
          date: today
        });
      }
    }

    // Check if user already attempted today's quiz
    const attempt = await QuizAttempt.findOne({
      userId: req.user._id,
      quizId: quiz._id
    });

    res.json({
      quiz: {
        _id: quiz._id,
        question: quiz.question,
        options: quiz.options,
        category: quiz.category,
        difficulty: quiz.difficulty
      },
      attempted: !!attempt,
      result: attempt ? {
        selectedAnswer: attempt.selectedAnswer,
        isCorrect: attempt.isCorrect,
        correctAnswer: quiz.correctAnswer,
        explanation: quiz.explanation
      } : null
    });
  } catch (error) {
    console.error('Get daily quiz error:', error);
    res.status(500).json({ message: 'Error fetching daily quiz' });
  }
};

export const submitQuizAnswer = async (req, res) => {
  try {
    const { quizId, selectedAnswer } = req.body;
    const today = getTodayDate();

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check if already attempted
    const existingAttempt = await QuizAttempt.findOne({
      userId: req.user._id,
      quizId: quiz._id
    });

    if (existingAttempt) {
      return res.status(400).json({ message: 'Quiz already attempted today' });
    }

    const isCorrect = selectedAnswer === quiz.correctAnswer;

    const attempt = await QuizAttempt.create({
      userId: req.user._id,
      quizId: quiz._id,
      selectedAnswer,
      isCorrect,
      date: today
    });

    // Award points for correct answer
    if (isCorrect) {
      const user = await User.findById(req.user._id);
      const points = quiz.difficulty === 'Easy' ? 5 : quiz.difficulty === 'Medium' ? 10 : 15;
      user.totalPoints += points;
      user.currentLevel = Math.floor(user.totalPoints / 500) + 1;
      await user.save();
    }

    res.json({
      isCorrect,
      correctAnswer: quiz.correctAnswer,
      explanation: quiz.explanation,
      pointsEarned: isCorrect ? (quiz.difficulty === 'Easy' ? 5 : quiz.difficulty === 'Medium' ? 10 : 15) : 0
    });
  } catch (error) {
    console.error('Submit quiz answer error:', error);
    res.status(500).json({ message: 'Error submitting quiz answer' });
  }
};

export const getQuizHistory = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ userId: req.user._id })
      .populate('quizId')
      .sort({ createdAt: -1 })
      .limit(30);

    const stats = {
      totalAttempts: attempts.length,
      correctAnswers: attempts.filter(a => a.isCorrect).length,
      accuracy: attempts.length > 0 
        ? Math.round((attempts.filter(a => a.isCorrect).length / attempts.length) * 100)
        : 0
    };

    res.json({ attempts, stats });
  } catch (error) {
    console.error('Get quiz history error:', error);
    res.status(500).json({ message: 'Error fetching quiz history' });
  }
};

// Seed some default quizzes
export const seedQuizzes = async () => {
  const count = await Quiz.countDocuments();
  if (count === 0) {
    const defaultQuizzes = [
      {
        question: "How many Surahs are in the Quran?",
        options: ["114", "110", "120", "100"],
        correctAnswer: 0,
        explanation: "The Quran contains 114 Surahs (chapters).",
        category: "Quran",
        difficulty: "Easy",
        date: "2024-01-01"
      },
      {
        question: "What is the longest Surah in the Quran?",
        options: ["Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Maidah"],
        correctAnswer: 0,
        explanation: "Surah Al-Baqarah is the longest chapter with 286 verses.",
        category: "Quran",
        difficulty: "Medium",
        date: "2024-01-02"
      },
      {
        question: "In which month was the Quran first revealed?",
        options: ["Shawwal", "Ramadan", "Dhul-Hijjah", "Muharram"],
        correctAnswer: 1,
        explanation: "The Quran was first revealed in the month of Ramadan.",
        category: "History",
        difficulty: "Easy",
        date: "2024-01-03"
      }
    ];

    await Quiz.insertMany(defaultQuizzes);
    console.log('✅ Default quizzes seeded');
  }
};
