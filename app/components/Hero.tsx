'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '10K+', label: 'Community Members' },
    { number: '50K+', label: 'Messages Daily' },
    { number: '100+', label: 'Support Groups' },
  ];

  const handleModalClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowLogin(false);
      setShowSignup(false);
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowLogin(false);
      setShowSignup(false);
    }
  };

  useEffect(() => {
    if (showLogin || showSignup) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [showLogin, showSignup]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 via-green-600 to-blue-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Connect.
            <span className="block text-yellow-300 bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              Share.
            </span>
            <span className="block text-white">Empower.</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            Your safe space to connect with others, share your journey, and find support. 
            Chat, post status updates, and build meaningful connections in our disability community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => setShowSignup(true)}
              className="group bg-yellow-400 hover:bg-yellow-300 text-green-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50"
            >
              <span className="flex items-center justify-center gap-2">
                Join Our Community
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button 
              onClick={() => {
                const featuresSection = document.querySelector('#features');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group border-2 border-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            >
              <span className="flex items-center justify-center gap-2">
                See Features
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center transform transition-all duration-500 delay-${index * 100}"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0
                }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2 text-yellow-300">{stat.number}</div>
                <div className="text-green-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => {
            const featuresSection = document.querySelector('#features');
            featuresSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-white hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-full"
          aria-label="Scroll to features"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={handleModalClose}
        >
          <div className="bg-white rounded-2xl p-8 max-w-md w-full transform animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
              <button 
                onClick={() => setShowLogin(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Close login modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-6">Login to access your community, chats, and profile.</p>
            <button 
              onClick={() => setShowLogin(false)}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
            >
              Coming Soon
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={handleModalClose}
        >
          <div className="bg-white rounded-2xl p-8 max-w-md w-full transform animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Join AbilityConnect</h3>
              <button 
                onClick={() => setShowSignup(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Close signup modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-6">Create your profile and start connecting with the community.</p>
            <button 
              onClick={() => setShowSignup(false)}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
            >
              Join Community
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
