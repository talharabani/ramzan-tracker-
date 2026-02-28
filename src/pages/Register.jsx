import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(fullName, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-islamic-beige flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="islamic-card animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-islamic-emerald to-islamic-gold flex items-center justify-center text-4xl shadow-lg">
                🌙
              </div>
            </div>
            <h1 className="text-4xl font-arabic font-bold text-transparent bg-clip-text bg-gradient-to-r from-islamic-emerald to-islamic-gold mb-2">
              Ramadan Tracker
            </h1>
            <p className="text-islamic-navy">
              Begin your spiritual growth journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-islamic-navy mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Your full name"
                className="islamic-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-islamic-navy mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="islamic-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-islamic-navy mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
                placeholder="At least 6 characters"
                className="islamic-input"
              />
            </div>

            <button 
              type="submit" 
              className="islamic-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center mt-6 text-islamic-navy">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-islamic-emerald font-semibold hover:text-islamic-gold transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Decorative Quote */}
        <div className="mt-6 text-center">
          <p className="text-islamic-navy italic">
            "The best among you are those who have the best manners." - Prophet Muhammad ﷺ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
