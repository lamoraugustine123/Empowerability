'use client';
import { useState, useEffect } from 'react';

export default function PrivacySettings() {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    postsVisibility: 'friends',
    photosVisibility: 'friends',
    friendListVisibility: 'friends',
    emailVisibility: 'private',
    locationVisibility: 'private',
    searchable: true,
    tagReview: true,
    messageFilter: 'friends',
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.privacySettings) {
      setPrivacySettings(userData.privacySettings);
    }
  }, []);

  const handleSettingChange = (setting, value) => {
    const updatedSettings = { ...privacySettings, [setting]: value };
    setPrivacySettings(updatedSettings);
    
    // Save to localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.privacySettings = updatedSettings;
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Show feedback
    showToast(`${setting.replace(/([A-Z])/g, ' $1')} updated`);
  };

  const showToast = (message) => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-[100] animate-slide-in';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('animate-slide-out');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  const resetToDefault = () => {
    const defaultSettings = {
      profileVisibility: 'public',
      postsVisibility: 'friends',
      photosVisibility: 'friends',
      friendListVisibility: 'friends',
      emailVisibility: 'private',
      locationVisibility: 'private',
      searchable: true,
      tagReview: true,
      messageFilter: 'friends',
    };
    setPrivacySettings(defaultSettings);
    
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.privacySettings = defaultSettings;
    localStorage.setItem('user', JSON.stringify(userData));
    
    showToast('Privacy settings reset to default');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Privacy Controls</h3>
        <button
          onClick={resetToDefault}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset to Default
        </button>
      </div>

      <div>
        <h3 className="font-medium mb-3">Profile Visibility</h3>
        <div className="space-y-2">
          {[
            { id: 'public', label: 'Public', desc: 'Anyone can see your profile', icon: '🌍' },
            { id: 'friends', label: 'Friends', desc: 'Only your friends can see your profile', icon: '👥' },
            { id: 'private', label: 'Private', desc: 'Only you can see your profile', icon: '🔒' }
          ].map((option) => (
            <label key={option.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="profileVisibility"
                value={option.id}
                checked={privacySettings.profileVisibility === option.id}
                onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                className="mr-3"
              />
              <div className="flex items-center space-x-3">
                <span className="text-xl">{option.icon}</span>
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Content Visibility</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Who Can See Your Posts</label>
            <select
              value={privacySettings.postsVisibility}
              onChange={(e) => handleSettingChange('postsVisibility', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white"
            >
              <option value="public">Public</option>
              <option value="friends">Friends</option>
              <option value="private">Only Me</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Who Can See Your Photos</label>
            <select
              value={privacySettings.photosVisibility}
              onChange={(e) => handleSettingChange('photosVisibility', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white"
            >
              <option value="public">Public</option>
              <option value="friends">Friends</option>
              <option value="private">Only Me</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Who Can See Your Friend List</label>
            <select
              value={privacySettings.friendListVisibility}
              onChange={(e) => handleSettingChange('friendListVisibility', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white"
            >
              <option value="public">Public</option>
              <option value="friends">Friends</option>
              <option value="private">Only Me</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Privacy Toggles</h3>
        
        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
          <div>
            <div className="font-medium">Searchable Profile</div>
            <div className="text-sm text-gray-600">Allow people to find you in search</div>
          </div>
          <button
            onClick={() => handleSettingChange('searchable', !privacySettings.searchable)}
            className={`w-12 h-6 rounded-full transition-colors relative ${privacySettings.searchable ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${privacySettings.searchable ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
          <div>
            <div className="font-medium">Tag Review</div>
            <div className="text-sm text-gray-600">Review posts you're tagged in before they appear</div>
          </div>
          <button
            onClick={() => handleSettingChange('tagReview', !privacySettings.tagReview)}
            className={`w-12 h-6 rounded-full transition-colors relative ${privacySettings.tagReview ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${privacySettings.tagReview ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Contact Privacy</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Who Can See Your Email</label>
            <select
              value={privacySettings.emailVisibility}
              onChange={(e) => handleSettingChange('emailVisibility', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white"
            >
              <option value="public">Public</option>
              <option value="friends">Friends</option>
              <option value="private">Only Me</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Who Can See Your Location</label>
            <select
              value={privacySettings.locationVisibility}
              onChange={(e) => handleSettingChange('locationVisibility', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white"
            >
              <option value="public">Public</option>
              <option value="friends">Friends</option>
              <option value="private">Only Me</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Who Can Message You</label>
            <select
              value={privacySettings.messageFilter}
              onChange={(e) => handleSettingChange('messageFilter', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white"
            >
              <option value="everyone">Everyone</option>
              <option value="friends">Friends Only</option>
              <option value="no_one">No One</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium mb-2">Privacy Tips</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Regularly review your privacy settings</li>
          <li>• Be cautious about sharing personal information</li>
          <li>• Use friend lists to organize your contacts</li>
          <li>• Review tags before they appear on your profile</li>
        </ul>
      </div>
    </div>
  );
}
