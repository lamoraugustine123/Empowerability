'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Background images for Modern Theme - Disability empowerment and community
const modernBackgrounds = [
  'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80',
  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
];

// Background images for Professional Theme - Disability success and achievement
const professionalBackgrounds = [
  'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1551833996-2c1d78b59a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80'
];

// Mobile Navigation Component
function MobileNav({ isAuthenticated, user, onLogout, theme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false);
  };

  return (
    <nav className={`relative z-50 ${theme === 'modern' ? 'bg-gray-900/95 border-b border-gray-700' : 'bg-white/95 border-b border-gray-200'} shadow-2xl backdrop-blur-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14">
          <Link href="/" className={`text-lg font-bold ${theme === 'modern' ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-all duration-300`}>
            EmpowerAbility
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-lg ${theme === 'modern' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className={`absolute top-14 left-0 right-0 ${theme === 'modern' ? 'bg-gray-900/95 border-t border-gray-700' : 'bg-white/95 border-t border-gray-200'} backdrop-blur-lg shadow-2xl`}>
            <div className="px-4 py-3 space-y-2">
              <Link 
                href="/about" 
                className={`block ${theme === 'modern' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-all duration-300 py-2 px-3 rounded-lg`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/community" 
                className={`block ${theme === 'modern' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-all duration-300 py-2 px-3 rounded-lg`}
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              <Link 
                href="/chat" 
                className={`block ${theme === 'modern' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-all duration-300 py-2 px-3 rounded-lg`}
                onClick={() => setIsMenuOpen(false)}
              >
                Chat
              </Link>
              <Link 
                href="/games" 
                className={`block ${theme === 'modern' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-all duration-300 py-2 px-3 rounded-lg`}
                onClick={() => setIsMenuOpen(false)}
              >
                Games
              </Link>
              <Link 
                href="/speeches" 
                className={`block ${theme === 'modern' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-all duration-300 py-2 px-3 rounded-lg`}
                onClick={() => setIsMenuOpen(false)}
              >
                Speeches
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    href="/profile" 
                    className={`block ${theme === 'modern' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-all duration-300 py-2 px-3 rounded-lg`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className={`block w-full text-left ${theme === 'modern' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-all duration-300 py-2 px-3 rounded-lg`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="pt-2 space-y-2">
                  <Link 
                    href="/login" 
                    className={`block text-center ${theme === 'modern' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'} py-2 rounded-lg transition-all duration-300 shadow-lg`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/join" 
                    className={`block text-center ${theme === 'modern' ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'} py-2 rounded-lg transition-all duration-300 shadow-lg`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Join Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Modern Theme Component with Disability Empowerment Focus
function ModernTheme({ isAuthenticated, user, onLogout }) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentBgIndex((prev) => (prev + 1) % modernBackgrounds.length);
        setIsTransitioning(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background - Disability Community & Empowerment */}
      <div className="absolute inset-0">
        {modernBackgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            } ${isTransitioning ? 'scale-105' : 'scale-100'}`}
            style={{
              backgroundImage: `url("${bg}")`,
              transform: `scale(${isTransitioning ? 1.05 : 1})`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-purple-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
      </div>

      <MobileNav isAuthenticated={isAuthenticated} user={user} onLogout={onLogout} theme="modern" />

      <div className="relative z-10 max-w-7xl mx-auto py-6 px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              EmpowerAbility
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
            Where disability becomes ability. Connect, share your journey, and grow with our supportive community.
          </p>

          <div className="bg-gray-900/70 rounded-xl shadow-2xl border border-purple-500/30 backdrop-blur-sm p-4 sm:p-6 max-w-4xl mx-auto mb-8">
            <div className="flex flex-col items-center gap-6">
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <div className="w-28 h-28 sm:w-36 sm:h-36 bg-gray-900 rounded-full flex items-center justify-center border-4 border-yellow-400/50">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-800/80 rounded-full flex flex-col items-center justify-center text-center p-4 border-2 border-pink-400/30">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mb-2 shadow-2xl">
                      {isAuthenticated ? (user?.name ? user.name.charAt(0).toUpperCase() : 'U') : '🌟'}
                    </div>
                    <span className="text-sm sm:text-base font-bold text-white">
                      {isAuthenticated ? 'Your Journey' : 'Your Journey'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  {isAuthenticated ? `Welcome Back ${user?.name || 'Warrior'}! 💪` : 'Start Your Empowerment Journey'}
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-600/50 to-purple-600/50 rounded-lg border border-blue-400/30 hover:from-blue-700/50 hover:to-purple-700/50 transition-all duration-300">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-lg">💬</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-white text-sm">Community Chat</h4>
                      <p className="text-blue-100 text-xs">Connect with peers who understand</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-600/50 to-teal-600/50 rounded-lg border border-green-400/30 hover:from-green-700/50 hover:to-teal-700/50 transition-all duration-300">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-lg">📖</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-white text-sm">Share Your Story</h4>
                      <p className="text-green-100 text-xs">Inspire others with your journey</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-lg border border-purple-400/30 hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-lg">🎮</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-white text-sm">Empowerment Games</h4>
                      <p className="text-purple-100 text-xs">Fun that builds confidence</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-red-500/50 to-orange-500/50 rounded-lg border border-red-400/30 hover:from-red-600/50 hover:to-orange-600/50 transition-all duration-300">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-lg">🎤</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-white text-sm">Voice Your Strength</h4>
                      <p className="text-red-100 text-xs">Share motivational speeches</p>
                    </div>
                  </div>
                </div>

                {isAuthenticated ? (
                  <div className="space-y-3">
                    <Link 
                      href="/community"
                      className="block w-full bg-gradient-to-r from-yellow-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:from-yellow-600 hover:to-pink-600 transition-all duration-300 font-bold shadow-lg transform hover:scale-105"
                    >
                      🌈 Enter Our Community
                    </Link>
                    <div className="grid grid-cols-2 gap-3">
                      <Link 
                        href="/chat"
                        className="block w-full bg-blue-600 text-white px-3 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-bold text-sm shadow-lg text-center transform hover:scale-105"
                      >
                        💬 Chat Now
                      </Link>
                      <Link 
                        href="/games"
                        className="block w-full bg-purple-600 text-white px-3 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 font-bold text-sm shadow-lg text-center transform hover:scale-105"
                      >
                        🎮 Play Games
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      href="/join"
                      className="block w-full bg-gradient-to-r from-yellow-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:from-yellow-600 hover:to-pink-600 transition-all duration-300 font-bold shadow-lg transform hover:scale-105"
                    >
                      🚀 Join Our Empowerment Family
                    </Link>
                    <p className="text-yellow-100 text-sm font-medium">
                      💫 Connect with thousands who truly understand your journey
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-gradient-to-r from-blue-600/40 to-purple-600/40 rounded-xl p-4 max-w-2xl mx-auto border border-white/20">
            <h3 className="text-white font-bold mb-3 text-lg">Our Empowerment Community 🌟</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-yellow-300 font-bold text-lg">2K+</div>
                <div className="text-blue-100 text-xs">Warriors</div>
              </div>
              <div>
                <div className="text-green-300 font-bold text-lg">1K+</div>
                <div className="text-blue-100 text-xs">Stories Shared</div>
              </div>
              <div>
                <div className="text-pink-300 font-bold text-lg">24/7</div>
                <div className="text-blue-100 text-xs">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Professional Theme Component with Disability Success Focus
function ProfessionalTheme({ isAuthenticated, user, onLogout }) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentBgIndex((prev) => (prev + 1) % professionalBackgrounds.length);
        setIsTransitioning(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Animated Professional Background - Disability Success Stories */}
      <div className="absolute inset-0">
        {professionalBackgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            } ${isTransitioning ? 'scale-110' : 'scale-100'}`}
            style={{
              backgroundImage: `url("${bg}")`,
              transform: `scale(${isTransitioning ? 1.1 : 1})`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-blue-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10"></div>
      </div>

      <MobileNav isAuthenticated={isAuthenticated} user={user} onLogout={onLogout} theme="professional" />

      <div className="relative z-10 max-w-7xl mx-auto py-6 px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              EmpowerAbility
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Professional platform where disability meets opportunity. Network, grow, and achieve together.
          </p>

          <div className="bg-white/90 rounded-xl shadow-2xl border border-blue-200/50 backdrop-blur-sm p-4 sm:p-6 max-w-4xl mx-auto mb-8">
            <div className="flex flex-col items-center gap-6">
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white rounded-full flex items-center justify-center border-4 border-blue-200">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-blue-50/80 rounded-full flex flex-col items-center justify-center text-center p-4 border-2 border-indigo-200/50">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mb-2 shadow-2xl">
                      {isAuthenticated ? (user?.name ? user.name.charAt(0).toUpperCase() : 'U') : '💼'}
                    </div>
                    <span className="text-sm sm:text-base font-bold text-gray-900">
                      {isAuthenticated ? 'Your Profile' : 'Your Success'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  {isAuthenticated ? `Welcome Back ${user?.name || 'Leader'}! 👑` : 'Build Your Professional Network'}
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50/80 rounded-lg border border-blue-200/50 hover:bg-blue-100/80 transition-all duration-300">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-lg text-white">💼</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 text-sm">Professional Network</h4>
                      <p className="text-gray-600 text-xs">Connect with disability professionals</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-green-50/80 rounded-lg border border-green-200/50 hover:bg-green-100/80 transition-all duration-300">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-lg text-white">📈</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 text-sm">Career Growth</h4>
                      <p className="text-gray-600 text-xs">Share success stories and opportunities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-purple-50/80 rounded-lg border border-purple-200/50 hover:bg-purple-100/80 transition-all duration-300">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-lg text-white">🎯</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 text-sm">Skill Building</h4>
                      <p className="text-gray-600 text-xs">Engaging professional development</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-indigo-50/80 rounded-lg border border-indigo-200/50 hover:bg-indigo-100/80 transition-all duration-300">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <span className="text-lg text-white">🌟</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 text-sm">Leadership Talks</h4>
                      <p className="text-gray-600 text-xs">Industry insights and mentorship</p>
                    </div>
                  </div>
                </div>

                {isAuthenticated ? (
                  <div className="space-y-3">
                    <Link 
                      href="/community"
                      className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold shadow-lg transform hover:scale-105"
                    >
                      🚀 Access Professional Network
                    </Link>
                    <div className="grid grid-cols-2 gap-3">
                      <Link 
                        href="/chat"
                        className="block w-full bg-green-600 text-white px-3 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-bold text-sm shadow-lg text-center transform hover:scale-105"
                      >
                        💼 Network
                      </Link>
                      <Link 
                        href="/speeches"
                        className="block w-full bg-indigo-600 text-white px-3 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 font-bold text-sm shadow-lg text-center transform hover:scale-105"
                      >
                        🎤 Learn
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      href="/join"
                      className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold shadow-lg transform hover:scale-105"
                    >
                      💪 Start Your Professional Journey
                    </Link>
                    <p className="text-gray-600 text-sm font-medium">
                      🌟 Join professionals turning challenges into opportunities
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Features */}
          <div className="bg-white/80 rounded-xl p-4 max-w-2xl mx-auto border border-blue-200">
            <h3 className="text-gray-900 font-bold mb-3">Professional Excellence 🏆</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-blue-600 font-bold">Networking</div>
                <div className="text-gray-600 text-xs">Industry connections</div>
              </div>
              <div className="text-center">
                <div className="text-green-600 font-bold">Mentorship</div>
                <div className="text-gray-600 text-xs">Career guidance</div>
              </div>
              <div className="text-center">
                <div className="text-purple-600 font-bold">Development</div>
                <div className="text-gray-600 text-xs">Skill building</div>
              </div>
              <div className="text-center">
                <div className="text-indigo-600 font-bold">Leadership</div>
                <div className="text-gray-600 text-xs">Growth opportunities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Theme Switcher Component
function ThemeSwitcher({ currentTheme, onThemeChange }) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/95 rounded-xl shadow-lg border border-gray-200/50 backdrop-blur-lg p-2">
        <div className="flex space-x-2">
          <button
            onClick={() => onThemeChange('modern')}
            className={`px-3 py-2 text-xs rounded-lg transition-all duration-300 font-semibold ${
              currentTheme === 'modern'
                ? 'bg-gradient-to-r from-yellow-500 to-pink-500 text-white shadow scale-105'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🌈 Community
          </button>
          <button
            onClick={() => onThemeChange('professional')}
            className={`px-3 py-2 text-xs rounded-lg transition-all duration-300 font-semibold ${
              currentTheme === 'professional'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow scale-105'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            💼 Professional
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Home Component
export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('modern');

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      setIsAuthenticated(!!token);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
    };

    checkAuth();

    // Listen for storage changes (for logout from other tabs)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check auth every second (for same tab logout)
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/';
  };

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('homepage-theme', theme);
  };

  return (
    <>
      <ThemeSwitcher currentTheme={currentTheme} onThemeChange={handleThemeChange} />
      {currentTheme === 'modern' ? (
        <ModernTheme 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLogout={handleLogout} 
        />
      ) : (
        <ProfessionalTheme 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLogout={handleLogout} 
        />
      )}
    </>
  );
}
