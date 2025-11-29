'use client';
import { useState, useEffect } from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileInfo from '../../components/ProfileInfo';
import ProfileFriends from '../../components/ProfileFriends';
import ProfilePosts from '../../components/ProfilePosts';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    // Try to get user from localStorage, or use demo data
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser({
          ...parsedUser,
          bio: parsedUser.bio || 'Hello! I am using EmpowerAbility.',
          status: parsedUser.status || 'Available',
          profilePicture: parsedUser.profilePicture || '/default-avatar.png',
          coverPhoto: parsedUser.coverPhoto || '/default-cover.jpg',
          friends: parsedUser.friends || [],
          posts: parsedUser.posts || []
        });
      } catch (e) {
        console.error('Error parsing user data:', e);
        setDemoUser();
      }
    } else {
      setDemoUser();
    }
  }, []);

  const setDemoUser = () => {
    setUser({
      id: 1,
      name: 'Demo User',
      email: 'demo@example.com',
      bio: 'This is a demo profile. Sign up to create your own!',
      status: 'Available',
      profilePicture: '/default-avatar.png',
      coverPhoto: '/default-cover.jpg',
      friends: [],
      posts: []
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader user={user} onUpdateUser={setUser} />
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto">
          <nav className="flex space-x-8">
            {['info', 'friends', 'posts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'info' ? 'About' : tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto py-6 px-4">
        {activeTab === 'info' && <ProfileInfo user={user} onUpdateUser={setUser} />}
        {activeTab === 'friends' && <ProfileFriends user={user} onUpdateUser={setUser} />}
        {activeTab === 'posts' && <ProfilePosts user={user} onUpdateUser={setUser} />}
      </div>
    </div>
  );
}
