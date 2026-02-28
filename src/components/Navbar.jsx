import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-islamic-emerald/10 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-4xl">🌙</span>
            <span className="text-2xl font-arabic font-bold text-transparent bg-clip-text bg-gradient-to-r from-islamic-emerald to-islamic-gold">
              Ramadan Tracker
            </span>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-islamic-emerald to-islamic-emerald-light text-white shadow-md' 
                    : 'text-islamic-navy hover:bg-islamic-beige'
                }`
              }
            >
              <span className="text-xl">🏠</span>
              <span className="hidden sm:inline">Home</span>
            </NavLink>
            
            <NavLink 
              to="/history" 
              className={({ isActive }) => 
                `flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-islamic-emerald to-islamic-emerald-light text-white shadow-md' 
                    : 'text-islamic-navy hover:bg-islamic-beige'
                }`
              }
            >
              <span className="text-xl">📅</span>
              <span className="hidden sm:inline">History</span>
            </NavLink>
            
            <NavLink 
              to="/leaderboard" 
              className={({ isActive }) => 
                `flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-islamic-emerald to-islamic-emerald-light text-white shadow-md' 
                    : 'text-islamic-navy hover:bg-islamic-beige'
                }`
              }
            >
              <span className="text-xl">🏆</span>
              <span className="hidden sm:inline">Leaderboard</span>
            </NavLink>
            
            <NavLink 
              to="/profile" 
              className={({ isActive }) => 
                `flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-islamic-emerald to-islamic-emerald-light text-white shadow-md' 
                    : 'text-islamic-navy hover:bg-islamic-beige'
                }`
              }
            >
              <span className="text-xl">👤</span>
              <span className="hidden sm:inline">Profile</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
