'use client';
import { useState } from 'react';
import EnhancedProfileSlider from './EnhancedProfileSlider';

export default function ProfileButton({ user }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsProfileOpen(true)}
        className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition-colors"
      >
        {/* Check for profile photo in localStorage */}
        {(() => {
          try {
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            if (userData.profilePhoto) {
              return (
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <img 
                    src={userData.profilePhoto.url} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            }
          } catch (e) {
            console.error('Error loading profile photo:', e);
          }
          
          return (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
          );
        })()}
        <span className="hidden md:inline font-medium">{user?.name?.split(' ')[0] || 'User'}</span>
      </button>

      <EnhancedProfileSlider 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />
    </>
  );
}
