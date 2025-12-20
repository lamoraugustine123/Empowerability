'use client';
import { useState, useEffect } from 'react';

export default function DataPrivacySettings() {
  const [consentSettings, setConsentSettings] = useState({
    analytics: true,
    personalizedAds: false,
    emailMarketing: true,
    dataSharing: false,
    locationTracking: false,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.consentSettings) {
      setConsentSettings(userData.consentSettings);
    }
  }, []);

  const handleConsentChange = (setting, value) => {
    const updatedSettings = { ...consentSettings, [setting]: value };
    setConsentSettings(updatedSettings);
    
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.consentSettings = updatedSettings;
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const downloadUserData = () => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `abilityconnect-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const clearAllData = () => {
    if (confirm('This will delete all your local data including settings, photos, and preferences. This action cannot be undone. Are you sure?')) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Data Privacy Controls</h3>
        <p className="text-sm text-gray-600">
          Manage how we collect and use your data in compliance with GDPR and other privacy regulations.
        </p>
      </div>

      <div>
        <h3 className="font-medium mb-3">Consent Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <div className="font-medium">Analytics & Improvement</div>
              <div className="text-sm text-gray-600">Help us improve the platform with anonymous usage data</div>
            </div>
            <button
              onClick={() => handleConsentChange('analytics', !consentSettings.analytics)}
              className={`w-12 h-6 rounded-full transition-colors relative ${consentSettings.analytics ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${consentSettings.analytics ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <div className="font-medium">Personalized Advertising</div>
              <div className="text-sm text-gray-600">Show ads based on your interests and activity</div>
            </div>
            <button
              onClick={() => handleConsentChange('personalizedAds', !consentSettings.personalizedAds)}
              className={`w-12 h-6 rounded-full transition-colors relative ${consentSettings.personalizedAds ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${consentSettings.personalizedAds ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <div className="font-medium">Email Marketing</div>
              <div className="text-sm text-gray-600">Receive newsletters and promotional emails</div>
            </div>
            <button
              onClick={() => handleConsentChange('emailMarketing', !consentSettings.emailMarketing)}
              className={`w-12 h-6 rounded-full transition-colors relative ${consentSettings.emailMarketing ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${consentSettings.emailMarketing ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <div className="font-medium">Data Sharing with Partners</div>
              <div className="text-sm text-gray-600">Share anonymized data with trusted partners for research</div>
            </div>
            <button
              onClick={() => handleConsentChange('dataSharing', !consentSettings.dataSharing)}
              className={`w-12 h-6 rounded-full transition-colors relative ${consentSettings.dataSharing ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${consentSettings.dataSharing ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <div className="font-medium">Location Tracking</div>
              <div className="text-sm text-gray-600">Use your location for localized features and content</div>
            </div>
            <button
              onClick={() => handleConsentChange('locationTracking', !consentSettings.locationTracking)}
              className={`w-12 h-6 rounded-full transition-colors relative ${consentSettings.locationTracking ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${consentSettings.locationTracking ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Data Management</h3>
        <div className="space-y-3">
          <button
            onClick={downloadUserData}
            className="w-full p-4 border rounded-lg text-left hover:bg-gray-50 flex items-center justify-between"
          >
            <div>
              <div className="font-medium">Download Your Data</div>
              <div className="text-sm text-gray-600">Get a copy of all your information in JSON format</div>
            </div>
            <span className="text-blue-600">⬇️</span>
          </button>

          <button
            onClick={() => alert('Data portability feature coming soon!')}
            className="w-full p-4 border rounded-lg text-left hover:bg-gray-50 flex items-center justify-between"
          >
            <div>
              <div className="font-medium">Data Portability</div>
              <div className="text-sm text-gray-600">Transfer your data to another service</div>
            </div>
            <span className="text-blue-600">🔄</span>
          </button>

          <button
            onClick={clearAllData}
            className="w-full p-4 border border-red-300 rounded-lg text-left hover:bg-red-50 flex items-center justify-between"
          >
            <div>
              <div className="font-medium text-red-600">Clear All Local Data</div>
              <div className="text-sm text-red-500">Delete all your settings, photos, and preferences</div>
            </div>
            <span className="text-red-600">🗑️</span>
          </button>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Your Privacy Rights</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Right to access your personal data</li>
          <li>• Right to correct inaccurate data</li>
          <li>• Right to delete your data</li>
          <li>• Right to restrict processing</li>
          <li>• Right to data portability</li>
          <li>• Right to object to processing</li>
        </ul>
        <p className="text-xs text-gray-500 mt-3">
          For more information, contact our Data Protection Officer at dpo@abilityconnect.com
        </p>
      </div>
    </div>
  );
}
