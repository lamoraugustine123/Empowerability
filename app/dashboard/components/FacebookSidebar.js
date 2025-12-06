'use client';
import { useState, useEffect } from 'react';

// Import existing profile components
import ProfileHeader from '../../../components/ProfileHeader';
import ProfileInfo from '../../../components/ProfileInfo';

export default function FacebookSidebar() {
  const [user, setUser] = useState(null);
  const [friendRequests, setFriendRequests] = useState([]);
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }

    // Mock friend requests
    setFriendRequests([
      { id: 1, name: 'Alex Johnson', mutualFriends: 3, avatar: 'A' },
      { id: 2, name: 'Maria Garcia', mutualFriends: 5, avatar: 'M' },
      { id: 3, name: 'David Smith', mutualFriends: 2, avatar: 'D' },
    ]);

    // Mock birthdays
    setBirthdays([
      { id: 1, name: 'Sarah Wilson', today: true },
      { id: 2, name: 'Michael Brown', daysLeft: 2 },
      { id: 3, name: 'Emily Davis', daysLeft: 5 },
    ]);
  }, []);

  const handleAcceptRequest = (id) => {
    setFriendRequests(prev => prev.filter(req => req.id !== id));
    // In real app, make API call
  };

  const handleRejectRequest = (id) => {
    setFriendRequests(prev => prev.filter(req => req.id !== id));
    // In real app, make API call
  };

  if (!user) {
    return (
      <div className="w-64 bg-white rounded-lg shadow-sm p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 space-y-4">
      {/* User Profile Card */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {user.name?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="font-bold text-gray-900">{user.name || 'User Name'}</div>
            <div className="text-sm text-gray-500">@{user.username || 'username'}</div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex justify-between border-t pt-3 text-sm">
          <div className="text-center">
            <div className="font-bold text-gray-900">124</div>
            <div className="text-gray-500">Friends</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-900">89</div>
            <div className="text-gray-500">Following</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-900">12</div>
            <div className="text-gray-500">Posts</div>
          </div>
        </div>
      </div>

      {/* Friend Requests */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-900">Friend Requests</h3>
          <span className="text-sm text-blue-500 cursor-pointer">See all</span>
        </div>
        
        {friendRequests.length > 0 ? (
          <div className="space-y-3">
            {friendRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    {request.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{request.name}</div>
                    <div className="text-xs text-gray-500">{request.mutualFriends} mutual friends</div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => handleAcceptRequest(request.id)}
                    className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-blue-600"
                    title="Accept"
                  >
                    ✓
                  </button>
                  <button 
                    onClick={() => handleRejectRequest(request.id)}
                    className="w-7 h-7 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs hover:bg-gray-300"
                    title="Reject"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-2">No pending requests</p>
        )}
      </div>

      {/* Birthdays */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-yellow-500">🎂</span>
          <h3 className="font-bold text-gray-900">Birthdays</h3>
        </div>
        
        {birthdays.length > 0 ? (
          <div className="space-y-2">
            {birthdays.map((birthday) => (
              <div key={birthday.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-pink-500">
                    🎂
                  </div>
                  <span>{birthday.name}</span>
                </div>
                {birthday.today ? (
                  <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded">Today</span>
                ) : (
                  <span className="text-xs text-gray-500">{birthday.daysLeft}d</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-2">No birthdays</p>
        )}
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-bold text-gray-900 mb-3">Quick Links</h3>
        <div className="space-y-2">
          {[
            { icon: '👥', label: 'Groups', count: '12' },
            { icon: '📺', label: 'Watch', count: '8' },
            { icon: '🛍️', label: 'Marketplace', count: '24' },
            { icon: '🎮', label: 'Gaming', count: '6' },
          ].map((link) => (
            <div key={link.label} className="flex items-center justify-between text-sm hover:bg-gray-50 p-1 rounded cursor-pointer">
              <div className="flex items-center space-x-2">
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </div>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{link.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
