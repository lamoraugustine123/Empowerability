'use client';
import { useState, useEffect } from 'react';

export default function ActivityLog() {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all'); // all, security, profile, posts

  useEffect(() => {
    // Load activities from localStorage or generate sample
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (userData.activityLog && userData.activityLog.length > 0) {
      setActivities(userData.activityLog);
    } else {
      // Generate sample activities
      const sampleActivities = [
        {
          id: 1,
          type: 'security',
          action: 'password_changed',
          description: 'Password changed successfully',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          ip: '192.168.1.1',
          device: 'Chrome on Windows',
          location: 'San Francisco, CA',
        },
        {
          id: 2,
          type: 'profile',
          action: 'profile_updated',
          description: 'Profile information updated',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          details: 'Updated bio and location',
        },
        {
          id: 3,
          type: 'security',
          action: 'login',
          description: 'Successful login from new device',
          timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
          ip: '10.0.0.1',
          device: 'Safari on iPhone',
          location: 'New York, NY',
        },
        {
          id: 4,
          type: 'posts',
          action: 'post_created',
          description: 'Created new post',
          timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
          postId: 'post_123',
        },
        {
          id: 5,
          type: 'settings',
          action: 'privacy_updated',
          description: 'Privacy settings updated',
          timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
          changes: ['Profile visibility changed to Friends'],
        },
        {
          id: 6,
          type: 'security',
          action: 'two_factor_enabled',
          description: 'Two-factor authentication enabled',
          timestamp: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(),
        },
      ];
      
      setActivities(sampleActivities);
      // Save to localStorage
      userData.activityLog = sampleActivities;
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, []);

  const addActivity = (activity) => {
    const newActivity = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...activity,
    };
    
    const updatedActivities = [newActivity, ...activities];
    setActivities(updatedActivities);
    
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.activityLog = updatedActivities;
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  const getActivityIcon = (type) => {
    switch(type) {
      case 'security': return '🔒';
      case 'profile': return '👤';
      case 'posts': return '📝';
      case 'settings': return '⚙️';
      default: return '📋';
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'security': return 'bg-red-100 text-red-800';
      case 'profile': return 'bg-blue-100 text-blue-800';
      case 'posts': return 'bg-green-100 text-green-800';
      case 'settings': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const clearActivityLog = () => {
    if (confirm('Are you sure you want to clear all activity history?')) {
      setActivities([]);
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      userData.activityLog = [];
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const exportActivityLog = () => {
    const dataStr = JSON.stringify(activities, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `activity-log-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Activity Log</h3>
        <div className="flex space-x-2">
          <button
            onClick={exportActivityLog}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Export Log
          </button>
          <button
            onClick={clearActivityLog}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto">
        {['all', 'security', 'profile', 'posts', 'settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              filter === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab === 'all' ? 'All Activities' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{activities.length}</div>
          <div className="text-sm text-gray-600">Total Activities</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">
            {activities.filter(a => a.type === 'security').length}
          </div>
          <div className="text-sm text-gray-600">Security</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {activities.filter(a => a.type === 'profile').length}
          </div>
          <div className="text-sm text-gray-600">Profile</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">
            {activities.filter(a => a.type === 'posts').length}
          </div>
          <div className="text-sm text-gray-600">Posts</div>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📋</div>
            <h4 className="font-medium mb-1">No activities found</h4>
            <p className="text-sm text-gray-600">Your activity log is empty</p>
          </div>
        ) : (
          filteredActivities.map(activity => (
            <div key={activity.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                    <span className="text-lg">{getActivityIcon(activity.type)}</span>
                  </div>
                  <div>
                    <div className="font-medium">{activity.description}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                    {activity.ip && (
                      <div className="text-xs text-gray-500 mt-1">
                        IP: {activity.ip} • {activity.device} • {activity.location}
                      </div>
                    )}
                    {activity.details && (
                      <div className="text-sm text-gray-700 mt-1">{activity.details}</div>
                    )}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs ${getActivityColor(activity.type)}`}>
                  {activity.type}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Activity Log Info */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">About Activity Log</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Logs are stored locally in your browser</li>
          <li>• Activities are retained for 90 days</li>
          <li>• You can export your complete activity history</li>
          <li>• Security activities include logins and password changes</li>
        </ul>
      </div>
    </div>
  );
}
