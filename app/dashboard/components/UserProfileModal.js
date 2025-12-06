'use client';
import { useState, useEffect, useRef } from 'react';

export default function UserProfileModal({ isOpen, onClose, user }) {
  const [activeTab, setActiveTab] = useState('profile');
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div 
        ref={modalRef}
        className="w-full max-w-md bg-white h-full overflow-y-auto animate-slideIn"
        style={{ animation: 'slideIn 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
              <p className="text-sm text-gray-600">Manage your account settings</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-3xl"
            >
              ×
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b">
            {[
              { id: 'profile', label: 'Profile', icon: '👤' },
              { id: 'security', label: 'Security', icon: '🔒' },
              { id: 'privacy', label: 'Privacy', icon: '👁️' },
              { id: 'notifications', label: 'Notifications', icon: '🔔' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 whitespace-nowrap border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Cover & Profile Photo */}
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-16">
            <div className="absolute -bottom-12 left-6">
              <div className="w-24 h-24 bg-white rounded-full p-2">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{user?.name || 'User Name'}</h1>
            <p className="text-gray-600 mb-4">{user?.email || 'user@example.com'}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <span className="mr-1">📍</span>
                <span>{user?.location || 'Location not set'}</span>
              </span>
              <span className="flex items-center">
                <span className="mr-1">👥</span>
                <span>245 friends</span>
              </span>
              <span className="flex items-center">
                <span className="mr-1">📅</span>
                <span>Joined Jan 2024</span>
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b mb-6">
            <div className="flex space-x-1">
              {['profile', 'security', 'privacy', 'notifications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 border-b-2 font-medium capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      defaultValue={user?.bio || 'Tell people about yourself...'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      rows="3"
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Security Settings</h3>
              <p>Change password, two-factor authentication, etc.</p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Privacy Settings</h3>
              <p>Control who can see your information.</p>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Notification Settings</h3>
              <p>Manage your notification preferences.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6">
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-50 text-red-600 rounded-md font-medium hover:bg-red-100"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Add inline styles */}
      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
