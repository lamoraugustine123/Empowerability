'use client';
import { useState, useEffect } from 'react';

// Import existing profile components
import ProfileHeader from '../../../components/ProfileHeader';
import ProfileInfo from '../../../components/ProfileInfo';
import ProfileFriends from '../../../components/ProfileFriends';

export default function UserProfileSidebar({ user }) {
  const [onlineFriends, setOnlineFriends] = useState(3);
  const [friendRequests, setFriendRequests] = useState(2);
  
  // Mock user data based on your existing structure
  const userData = user || {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: 'Community Member',
    bio: 'Disability advocate & accessibility enthusiast. Making the world more inclusive one step at a time.',
    location: 'San Francisco, CA',
    joinedDate: 'January 2023',
    disabilityType: 'Visual Impairment',
    isVerified: true,
    stats: {
      friends: 245,
      posts: 42,
      groups: 12
    }
  };

  // Combine with additional dashboard-specific data
  const enhancedUserData = {
    ...userData,
    // Add dashboard-specific properties
    isOnline: true,
    avatar: userData.name?.substring(0, 2).toUpperCase() || 'TU',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
    badges: ['🏆 Top Contributor', '🌟 Community Leader', '💬 Active Member']
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setOnlineFriends(prev => {
        const change = Math.random() > 0.6 ? 1 : Math.random() > 0.3 ? -1 : 0;
        return Math.max(1, Math.min(prev + change, 10));
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Extract friend requests data for the sidebar
  const friendRequestsData = [
    {
      id: 1,
      name: 'Alex Morgan',
      avatar: 'AM',
      mutualFriends: 12,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      name: 'Jamie Rivera',
      avatar: 'JR',
      mutualFriends: 8,
      timestamp: '4 hours ago'
    }
  ];

  return (
    <div className="space-y-4">
      {/* User Profile Card - Using existing ProfileHeader but simplified */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Simplified Profile Header */}
        <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          <div className="absolute -bottom-6 left-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-3 border-white flex items-center justify-center text-white font-bold">
              {enhancedUserData.avatar}
            </div>
          </div>
          {enhancedUserData.isOnline && (
            <div className="absolute bottom-4 left-14 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        
        {/* User Info - Using ProfileInfo component */}
        <div className="pt-8 px-4 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-gray-900">{enhancedUserData.name}</h3>
              {enhancedUserData.isVerified && (
                <span className="text-blue-500 text-xs ml-1">✓ Verified</span>
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-1">{enhancedUserData.bio}</p>
          
          {/* Stats - Simplified version */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t">
            <div className="text-center">
              <div className="font-bold text-blue-600">{enhancedUserData.stats.friends}</div>
              <div className="text-xs text-gray-500">Friends</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-600">{onlineFriends}</div>
              <div className="text-xs text-gray-500">Online</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-600">{enhancedUserData.stats.posts}</div>
              <div className="text-xs text-gray-500">Posts</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-3 space-y-2">
            <a 
              href="/profile" 
              className="block w-full bg-blue-600 text-white py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 text-center"
            >
              View Profile
            </a>
          </div>
        </div>
      </div>

      {/* Friend Requests - Using ProfileFriends component but simplified */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Friend Requests</h3>
          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {friendRequests}
          </span>
        </div>
        
        <div className="space-y-3">
          {friendRequestsData.map((request) => (
            <div key={request.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {request.avatar}
                </div>
                <div>
                  <div className="font-medium">{request.name}</div>
                  <div className="text-xs text-gray-500">
                    {request.mutualFriends} mutual friends
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                  ✓
                </button>
                <button className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300">
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full text-center text-blue-600 text-sm font-medium mt-3 hover:text-blue-800">
          See all requests
        </button>
      </div>

      {/* Birthdays Section */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <span className="text-yellow-500 mr-2">🎂</span>
          Birthdays
        </h3>
        <div className="space-y-3">
          {[
            { id: 1, name: 'Maria Garcia', avatar: 'MG', today: true },
            { id: 2, name: 'David Kim', avatar: 'DK', today: false, days: 2 }
          ].map((birthday) => (
            <div key={birthday.id} className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                {birthday.avatar}
              </div>
              <div className="ml-3">
                <div className="font-medium">{birthday.name}</div>
                <div className="text-xs text-gray-500">
                  {birthday.today ? 'Birthday today!' : `Birthday in ${birthday.days} days`}
                </div>
              </div>
              {birthday.today && (
                <button className="ml-auto text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200">
                  Wish
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Your Shortcuts</h3>
        <div className="space-y-2">
          {[
            { icon: '👥', label: 'Groups', count: 5 },
            { icon: '🏪', label: 'Marketplace', count: null },
            { icon: '🎬', label: 'Watch', count: 12 },
            { icon: '📚', label: 'Learning', count: 3 },
            { icon: '🎮', label: 'Gaming', count: 8 }
          ].map((shortcut) => (
            <a
              key={shortcut.label}
              href="#"
              className="flex items-center justify-between p-2 rounded hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{shortcut.icon}</span>
                <span className="text-sm">{shortcut.label}</span>
              </div>
              {shortcut.count !== null && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {shortcut.count}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
