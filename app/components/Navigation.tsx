'use client';

import { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import ForgotPasswordModal from './ForgotPasswordModal';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in (simplified version)
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, you'd verify the token and get user data
      setUser({
        displayName: 'User',
        email: 'user@example.com'
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Community', href: '#community' },
    { name: 'Chat', href: '#chat' },
    { name: 'About', href: '#about' },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a 
                href="#home"
                onClick={(e) => handleNavClick('#home', e)}
                className="flex-shrink-0 flex items-center"
              >
                <span className={`text-2xl font-bold transition-colors ${
                  isScrolled ? 'text-green-600' : 'text-white'
                }`}>
                  AbilityConnect
                </span>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`font-medium transition-colors hover:text-green-600 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Auth Buttons */}
              <div className="flex items-center space-x-4 ml-4">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <span className={`font-medium ${
                      isScrolled ? 'text-gray-700' : 'text-white'
                    }`}>
                      Hi, {user.displayName}
                    </span>
                    <button 
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => setShowLogin(true)}
                      className={`font-medium transition-colors hover:text-green-600 ${
                        isScrolled ? 'text-gray-700' : 'text-white'
                      }`}
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => setShowSignup(true)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
                    >
                      Join Community
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md transition-colors ${
                  isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'
                }`}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200/20 bg-white/95 backdrop-blur-md rounded-b-2xl shadow-xl">
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="text-gray-700 hover:text-green-600 font-medium px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-200 space-y-3 px-4">
                  {user ? (
                    <>
                      <div className="text-gray-700 font-medium py-2">
                        Welcome, {user.displayName}
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium text-center transition-colors shadow-lg"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => setShowLogin(true)}
                        className="w-full text-left text-gray-700 hover:text-green-600 font-medium py-2 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        Login
                      </button>
                      <button 
                        onClick={() => setShowSignup(true)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium text-center transition-colors shadow-lg"
                      >
                        Join Community
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
        onForgotPassword={() => {
          setShowLogin(false);
          setShowForgotPassword(true);
        }}
        onLoginSuccess={(userData: any) => setUser(userData)}
      />

      <SignupModal
         
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
        onSignupSuccess={(userData: any) => setUser(userData)}
      />

      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSwitchToLogin={() => {
          setShowForgotPassword(false);
          setShowLogin(true);
        }}
      />
    </>
  );
}
