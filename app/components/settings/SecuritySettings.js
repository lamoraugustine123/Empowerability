'use client';
import DataPrivacySettings from './DataPrivacySettings';
import { useState } from 'react';

export default function SecuritySettings() {
  const [activeTab, setActiveTab] = useState('security');

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessions, setSessions] = useState([
    { id: 1, device: 'Chrome on Windows', location: 'San Francisco, CA', lastActive: '2 hours ago', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'New York, NY', lastActive: '1 day ago', current: false },
    { id: 3, device: 'Firefox on Linux', location: 'London, UK', lastActive: '1 week ago', current: false },
  ]);

  const handlePasswordChange = (e) => {
    setPasswordForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updatePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    alert('Password updated successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const revokeSession = (sessionId) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    alert('Session revoked successfully!');
  };

  const revokeAllSessions = () => {
    if (confirm('Are you sure you want to revoke all other sessions?')) {
      setSessions(prev => prev.filter(session => session.current));
      alert('All other sessions have been revoked!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Security Overview</h3>
        <p className="text-sm text-gray-600">
          Protect your account with strong security settings and monitor account activity.
        </p>
      </div>

      <div>
        <h3 className="font-medium mb-3">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter current password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter new password"
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters with letters and numbers
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Confirm new password"
            />
          </div>
          
          <button
            onClick={updatePassword}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Update Password
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Two-Factor Authentication</h3>
        <div className="p-4 border rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-gray-600">
                {twoFactorEnabled 
                  ? 'Adds an extra layer of security to your account' 
                  : 'Enable for enhanced security'}
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${twoFactorEnabled ? 'bg-green-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${twoFactorEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
          
          {twoFactorEnabled && (
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-1">Setup Instructions</h4>
              <ol className="text-sm text-green-700 list-decimal pl-4 space-y-1">
                <li>Download an authenticator app (Google Authenticator or Authy)</li>
                <li>Scan the QR code with your app</li>
                <li>Enter the 6-digit code from the app</li>
                <li>Save your backup codes in a secure place</li>
              </ol>
              <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                Setup Now
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Login Alerts</h3>
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Email notifications for new logins</div>
              <div className="text-sm text-gray-600">
                Get notified when someone logs into your account from a new device
              </div>
            </div>
            <button
              onClick={() => setLoginAlerts(!loginAlerts)}
              className={`w-12 h-6 rounded-full transition-colors relative ${loginAlerts ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${loginAlerts ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Active Sessions</h3>
          <button
            onClick={revokeAllSessions}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Revoke All Others
          </button>
        </div>
        
        <div className="space-y-3">
          {sessions.map(session => (
            <div key={session.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{session.device}</div>
                  <div className="text-sm text-gray-600">
                    {session.location} • Last active: {session.lastActive}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {session.current && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      Current
                    </span>
                  )}
                  {!session.current && (
                    <button
                      onClick={() => revokeSession(session.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Data & Privacy</h3>
        <div className="mb-4">
          <button 
            onClick={() => window.location.hash = 'data-privacy'}
            className="w-full p-4 border rounded-lg text-left hover:bg-gray-50 flex items-center justify-between"
          >
            <div>
              <div className="font-medium">Data Privacy Controls</div>
              <div className="text-sm text-gray-600">Manage GDPR compliance and data consent settings</div>
            </div>
            <span className="text-blue-600">⚙️</span>
          </button>
        </div>
        
        {/* Data Privacy Settings Component */}
        <div id="data-privacy">
          <DataPrivacySettings />
        </div>
      </div>

      <div className="p-4 bg-red-50 rounded-lg">
        <h3 className="font-medium text-red-800 mb-2">Danger Zone</h3>
        <p className="text-sm text-red-700 mb-3">
          These actions are irreversible. Please proceed with caution.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => alert('Account deactivation feature coming soon!')}
            className="w-full py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
          >
            Deactivate Account
          </button>
          <button
            onClick={() => {
              if (confirm('Are you absolutely sure? This will permanently delete your account and all data.')) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.location.href = '/';
              }
            }}
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete Account Permanently
          </button>
        </div>
      </div>
    </div>
  );
}
