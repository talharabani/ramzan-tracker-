import { useState, useEffect } from 'react';
import axios from 'axios';

const DailyQuiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    fetchDailyQuiz();
  }, []);

  const fetchDailyQuiz = async () => {
    try {
      const { data } = await axios.get('/api/quizzes/daily');
      setQuiz(data.quiz);
      setAttempted(data.attempted);
      if (data.attempted) {
        setSelectedAnswer(data.result.selectedAnswer);
        setResult(data.result);
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;

    try {
      const { data } = await axios.post('/api/quizzes/submit', {
        quizId: quiz._id,
        selectedAnswer
      });
      setResult(data);
      setAttempted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (loading) {
    return (
      <div className="islamic-card animate-pulse">
        <div className="h-8 bg-islamic-beige-dark rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-islamic-beige-dark rounded w-full mb-2"></div>
        <div className="h-4 bg-islamic-beige-dark rounded w-2/3"></div>
      </div>
    );
  }

  if (!quiz) return null;

  return (
    <div className="islamic-card border-2 border-islamic-emerald/20 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-arabic font-bold text-islamic-emerald flex items-center gap-2">
          <span className="text-3xl">📚</span>
          Daily Islamic Quiz
        </h3>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
          quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-700 border border-green-300' :
          quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' :
          'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {quiz.difficulty}
        </span>
      </div>

      <div className="mb-6">
        <p className="text-xl font-medium text-gray-800 mb-2">{quiz.question}</p>
        <p className="text-sm text-gray-600">Category: {quiz.category}</p>
      </div>

      <div className="space-y-3 mb-6">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !attempted && setSelectedAnswer(index)}
            disabled={attempted}
            className={`w-full text-left px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
              selectedAnswer === index && !result
                ? 'bg-islamic-emerald/10 border-islamic-emerald'
                : result && index === result.correctAnswer
                ? 'bg-green-100 border-green-500'
                : result && selectedAnswer === index && !result.isCorrect
                ? 'bg-red-100 border-red-500'
                : 'border-islamic-emerald/20 bg-white hover:bg-islamic-emerald/5 hover:border-islamic-emerald/40'
            } ${attempted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center gap-3">
              <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                selectedAnswer === index && !result
                  ? 'bg-islamic-emerald text-white'
                  : result && index === result.correctAnswer
                  ? 'bg-green-500 text-white'
                  : result && selectedAnswer === index && !result.isCorrect
                  ? 'bg-red-500 text-white'
                  : 'bg-islamic-beige-light text-islamic-emerald'
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1 text-left font-medium">{option}</span>
              {result && index === result.correctAnswer && (
                <span className="text-green-600 text-2xl">✓</span>
              )}
              {result && selectedAnswer === index && !result.isCorrect && (
                <span className="text-red-600 text-2xl">✗</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {!attempted && (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="islamic-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
      )}

      {result && (
        <div className={`mt-6 p-6 rounded-2xl border-2 ${
          result.isCorrect
            ? 'bg-green-50 border-green-300'
            : 'bg-red-50 border-red-300'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{result.isCorrect ? '🎉' : '💡'}</span>
            <p className="font-bold text-xl">
              {result.isCorrect ? 'Masha\'Allah! Correct!' : 'Not quite right'}
            </p>
          </div>
          <p className="text-gray-700 mb-3 leading-relaxed">{result.explanation}</p>
          {result.isCorrect && (
            <p className="text-sm font-medium text-green-700">
              +{result.pointsEarned} points earned!
            </p>
          )}
        </div>
      )}

      {attempted && (
        <div className="mt-6 p-6 bg-islamic-gold/10 rounded-2xl border-2 border-islamic-gold/30 text-center">
          <p className="text-lg font-medium text-islamic-emerald mb-2">
            ✨ Quiz Completed!
          </p>
          <p className="text-sm text-gray-700">
            Come back tomorrow for a new quiz and earn more points!
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyQuiz;
