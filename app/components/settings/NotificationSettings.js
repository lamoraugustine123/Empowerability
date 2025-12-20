'use client';
import { useState, useEffect } from 'react';

export default function NotificationSettings() {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    desktopNotifications: false,
    
    newMessages: true,
    friendRequests: true,
    postComments: true,
    postLikes: false,
    eventReminders: true,
    birthdayReminders: true,
    groupUpdates: false,
    mentionNotifications: true,
    tagNotifications: true,
    trendingPosts: false,
    
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
    weekendMode: false,
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.notificationSettings) {
      setNotificationSettings(userData.notificationSettings);
    }
  }, []);

  const handleSettingChange = (setting, value) => {
    const updatedSettings = { ...notificationSettings, [setting]: value };
    setNotificationSettings(updatedSettings);
    
    // Save to localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.notificationSettings = updatedSettings;
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Show feedback
    showToast(`${setting.replace(/([A-Z])/g, ' $1')} updated`);
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-[100] animate-slide-in';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('animate-slide-out');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  const toggleAllNotifications = (enabled) => {
    const updatedSettings = {
      ...notificationSettings,
      emailNotifications: enabled,
      pushNotifications: enabled,
      soundEnabled: enabled,
      desktopNotifications: enabled,
      newMessages: enabled,
      friendRequests: enabled,
      postComments: enabled,
      postLikes: enabled,
      eventReminders: enabled,
      birthdayReminders: enabled,
      groupUpdates: enabled,
      mentionNotifications: enabled,
      tagNotifications: enabled,
      trendingPosts: enabled,
    };
    
    setNotificationSettings(updatedSettings);
    
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.notificationSettings = updatedSettings;
    localStorage.setItem('user', JSON.stringify(userData));
    
    showToast(enabled ? 'All notifications enabled' : 'All notifications disabled');
  };

  const testNotification = (type) => {
    if (!notificationSettings.pushNotifications) {
      alert('Enable push notifications to test');
      return;
    }
    
    if ('Notification' in window && Notification.permission === 'granted') {
      const notificationTypes = {
        newMessages: { title: 'New Message', body: 'You have a new message from Sarah' },
        friendRequests: { title: 'Friend Request', body: 'Mike sent you a friend request' },
        postComments: { title: 'New Comment', body: 'David commented on your post' },
        postLikes: { title: 'Post Liked', body: 'Emma liked your post' },
      };
      
      if (notificationTypes[type]) {
        new Notification(notificationTypes[type].title, {
          body: notificationTypes[type].body,
          icon: '/logo.png'
        });
        showToast('Test notification sent!');
      }
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          testNotification(type);
        }
      });
    } else {
      alert('Notifications are blocked or not supported');
    }
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          handleSettingChange('desktopNotifications', true);
          showToast('Desktop notifications enabled!');
        }
      });
    }
  };

  const resetToDefault = () => {
    const defaultSettings = {
      emailNotifications: true,
      pushNotifications: true,
      soundEnabled: true,
      desktopNotifications: false,
      newMessages: true,
      friendRequests: true,
      postComments: true,
      postLikes: false,
      eventReminders: true,
      birthdayReminders: true,
      groupUpdates: false,
      mentionNotifications: true,
      tagNotifications: true,
      trendingPosts: false,
      quietHoursEnabled: false,
      quietHoursStart: '22:00',
      quietHoursEnd: '08:00',
      weekendMode: false,
    };
    
    setNotificationSettings(defaultSettings);
    
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.notificationSettings = defaultSettings;
    localStorage.setItem('user', JSON.stringify(userData));
    
    showToast('Notification settings reset to default');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Notification Preferences</h3>
        <button
          onClick={resetToDefault}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset to Default
        </button>
      </div>

      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div>
          <div className="font-medium">Quick Controls</div>
          <div className="text-sm text-gray-600">Toggle all notifications</div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => toggleAllNotifications(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            Enable All
          </button>
          <button
            onClick={() => toggleAllNotifications(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400"
          >
            Disable All
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Notification Methods</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <div className="font-medium">Email Notifications</div>
              <div className="text-sm text-gray-600">Receive notifications via email</div>
            </div>
            <button
              onClick={() => handleSettingChange('emailNotifications', !notificationSettings.emailNotifications)}
              className={`w-12 h-6 rounded-full transition-colors relative ${notificationSettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${notificationSettings.emailNotifications ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <div className="font-medium">Push Notifications</div>
              <div className="text-sm text-gray-600">Receive browser push notifications</div>
              <button
                onClick={() => testNotification('newMessages')}
                className="mt-1 text-xs text-blue-600 hover:text-blue-800"
              >
                Test notification
              </button>
            </div>
            <button
              onClick={() => handleSettingChange('pushNotifications', !notificationSettings.pushNotifications)}
              className={`w-12 h-6 rounded-full transition-colors relative ${notificationSettings.pushNotifications ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${notificationSettings.pushNotifications ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <div className="font-medium">Sound Alerts</div>
              <div className="text-sm text-gray-600">Play sound for new notifications</div>
            </div>
            <button
              onClick={() => handleSettingChange('soundEnabled', !notificationSettings.soundEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${notificationSettings.soundEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${notificationSettings.soundEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <div className="font-medium">Desktop Notifications</div>
              <div className="text-sm text-gray-600">Show desktop notifications</div>
              <button
                onClick={requestNotificationPermission}
                className="mt-1 text-xs text-blue-600 hover:text-blue-800"
              >
                Request permission
              </button>
            </div>
            <button
              onClick={() => handleSettingChange('desktopNotifications', !notificationSettings.desktopNotifications)}
              className={`w-12 h-6 rounded-full transition-colors relative ${notificationSettings.desktopNotifications ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${notificationSettings.desktopNotifications ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">What to Notify Me About</h3>
        <div className="space-y-3">
          {[
            { id: 'newMessages', label: 'New Messages', desc: 'When someone sends you a message', test: true },
            { id: 'friendRequests', label: 'Friend Requests', desc: 'When someone sends a friend request', test: true },
            { id: 'postComments', label: 'Post Comments', desc: 'When someone comments on your post', test: true },
            { id: 'postLikes', label: 'Post Likes', desc: 'When someone likes your post', test: true },
            { id: 'eventReminders', label: 'Event Reminders', desc: 'Reminders for upcoming events' },
            { id: 'birthdayReminders', label: 'Birthday Reminders', desc: 'Reminders for friends\' birthdays' },
            { id: 'groupUpdates', label: 'Group Updates', desc: 'Updates from groups you\'re in' },
            { id: 'mentionNotifications', label: 'Mentions', desc: 'When someone mentions you' },
            { id: 'tagNotifications', label: 'Tags', desc: 'When someone tags you in a post' },
            { id: 'trendingPosts', label: 'Trending Posts', desc: 'Popular posts in your network' },
          ].map((notification) => (
            <div key={notification.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div>
                <div className="font-medium">{notification.label}</div>
                <div className="text-sm text-gray-600">{notification.desc}</div>
                {notification.test && (
                  <button
                    onClick={() => testNotification(notification.id)}
                    className="mt-1 text-xs text-blue-600 hover:text-blue-800"
                  >
                    Test notification
                  </button>
                )}
              </div>
              <button
                onClick={() => handleSettingChange(notification.id, !notificationSettings[notification.id])}
                className={`w-12 h-6 rounded-full transition-colors relative ${notificationSettings[notification.id] ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${notificationSettings[notification.id] ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Notification Schedule</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <div className="font-medium">Quiet Hours</div>
              <div className="text-sm text-gray-600">Pause notifications during certain hours</div>
              {notificationSettings.quietHoursEnabled && (
                <div className="text-xs text-gray-500 mt-1">
                  {notificationSettings.quietHoursStart} to {notificationSettings.quietHoursEnd}
                </div>
              )}
            </div>
            <button
              onClick={() => handleSettingChange('quietHoursEnabled', !notificationSettings.quietHoursEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${notificationSettings.quietHoursEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${notificationSettings.quietHoursEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
          
          {notificationSettings.quietHoursEnabled && (
            <div className="grid grid-cols-2 gap-4 p-3 border rounded-lg bg-gray-50">
              <div>
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input
                  type="time"
                  value={notificationSettings.quietHoursStart}
                  onChange={(e) => handleSettingChange('quietHoursStart', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Time</label>
                <input
                  type="time"
                  value={notificationSettings.quietHoursEnd}
                  onChange={(e) => handleSettingChange('quietHoursEnd', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <div className="font-medium">Weekend Mode</div>
              <div className="text-sm text-gray-600">Reduce notifications on weekends</div>
            </div>
            <button
              onClick={() => handleSettingChange('weekendMode', !notificationSettings.weekendMode)}
              className={`w-12 h-6 rounded-full transition-colors relative ${notificationSettings.weekendMode ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${notificationSettings.weekendMode ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-medium mb-2">Notification Tips</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Use quiet hours to avoid disturbances during sleep</li>
          <li>• Enable weekend mode for better work-life balance</li>
          <li>• Test notifications to ensure they work properly</li>
          <li>• Customize based on what's most important to you</li>
        </ul>
      </div>
    </div>
  );
}
