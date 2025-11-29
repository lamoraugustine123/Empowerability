'use client';
import { useState, useEffect } from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileInfo from '../../components/ProfileInfo';
import ProfileFriends from '../../components/ProfileFriends';
import ProfilePosts from '../../components/ProfilePosts';

export default function TestProfilePage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    // Directly set user data for testing
    setUser({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      bio: 'Hello! I am using EmpowerAbility.',
      status: 'Available',
      profilePicture: '/default-avatar.png',
      coverPhoto: '/default-cover.jpg',
      friends: [],
      posts: []
    });
  }, []);

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
        <p className="text-yellow-700">TEST MODE: Bypassing authentication</p>
      </div>
      
      <ProfileHeader user={user} onUpdateUser={setUser} />
      
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

      <div className="max-w-4xl mx-auto py-6 px-4">
        {activeTab === 'info' && <ProfileInfo user={user} onUpdateUser={setUser} />}
        {activeTab === 'friends' && <ProfileFriends user={user} onUpdateUser={setUser} />}
        {activeTab === 'posts' && <ProfilePosts user={user} onUpdateUser={setUser} />}
      </div>
    </div>
  );
}
