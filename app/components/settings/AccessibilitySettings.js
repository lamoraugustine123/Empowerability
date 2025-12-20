'use client';
import { useState, useEffect } from 'react';

export default function AccessibilitySettings() {
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    fontSize: 'normal',
    reduceMotion: false,
    screenReader: false,
    colorBlindMode: 'none',
    keyboardNavigation: true,
    altTextRequired: true,
    captionVideos: true,
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.accessibilitySettings) {
      setAccessibilitySettings(userData.accessibilitySettings);
      applySettings(userData.accessibilitySettings);
    }
  }, []);

  const applySettings = (settings) => {
    // Apply high contrast
    if (settings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    // Apply reduced motion
    if (settings.reduceMotion) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
    
    // Apply font size
    document.body.className = document.body.className.replace(/(font-size-\w+)/g, '');
    document.body.classList.add(`font-size-${settings.fontSize}`);
    
    // Apply color blind mode
    document.body.className = document.body.className.replace(/(color-blind-\w+)/g, '');
    if (settings.colorBlindMode !== 'none') {
      document.body.classList.add(`color-blind-${settings.colorBlindMode}`);
    }
  };

  const handleSettingChange = (setting, value) => {
    const updatedSettings = { ...accessibilitySettings, [setting]: value };
    setAccessibilitySettings(updatedSettings);
    applySettings(updatedSettings);
    
    // Save to localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.accessibilitySettings = updatedSettings;
    localStorage.setItem('user', JSON.stringify(updatedSettings));
    
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

  const previewFontSize = (size) => {
    const previewDiv = document.createElement('div');
    previewDiv.className = 'fixed bottom-4 left-4 bg-white border rounded-lg shadow-lg p-4 z-[100]';
    previewDiv.innerHTML = `
      <div class="font-bold mb-2">Preview Text Size</div>
      <div class="font-size-${size}">
        This is how text will appear with ${size} font size.
        Adjust until comfortable for reading.
      </div>
      <button class="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm" onclick="this.parentElement.remove()">
        Close Preview
      </button>
    `;
    document.body.appendChild(previewDiv);
  };

  const previewColorBlindMode = (mode) => {
    const modes = {
      none: 'Normal Color Vision',
      protanopia: 'Protanopia (Red-weak)',
      deuteranopia: 'Deuteranopia (Green-weak)',
      tritanopia: 'Tritanopia (Blue-yellow)'
    };
    
    alert(`Color blind mode preview: ${modes[mode]}\n\nThis simulates how colors appear to people with ${modes[mode].toLowerCase()}.`);
  };

  const resetToDefault = () => {
    const defaultSettings = {
      highContrast: false,
      fontSize: 'normal',
      reduceMotion: false,
      screenReader: false,
      colorBlindMode: 'none',
      keyboardNavigation: true,
      altTextRequired: true,
      captionVideos: true,
    };
    
    setAccessibilitySettings(defaultSettings);
    applySettings(defaultSettings);
    
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.accessibilitySettings = defaultSettings;
    localStorage.setItem('user', JSON.stringify(userData));
    
    showToast('Accessibility settings reset to default');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Accessibility Features</h3>
        <button
          onClick={resetToDefault}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset to Default
        </button>
      </div>

      <div>
        <h3 className="font-medium mb-3">Visual Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <div className="font-medium">High Contrast Mode</div>
              <div className="text-sm text-gray-600">Increase color contrast for better visibility</div>
            </div>
            <button
              onClick={() => handleSettingChange('highContrast', !accessibilitySettings.highContrast)}
              className={`w-12 h-6 rounded-full transition-colors relative ${accessibilitySettings.highContrast ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${accessibilitySettings.highContrast ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div>
              <div className="font-medium">Reduced Motion</div>
              <div className="text-sm text-gray-600">Minimize animations and transitions</div>
            </div>
            <button
              onClick={() => handleSettingChange('reduceMotion', !accessibilitySettings.reduceMotion)}
              className={`w-12 h-6 rounded-full transition-colors relative ${accessibilitySettings.reduceMotion ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${accessibilitySettings.reduceMotion ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Text Size</h3>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { id: 'small', label: 'Small', size: 'text-sm', preview: 'A' },
            { id: 'normal', label: 'Normal', size: 'text-base', preview: 'A' },
            { id: 'large', label: 'Large', size: 'text-lg', preview: 'A' },
            { id: 'xlarge', label: 'XL', size: 'text-xl', preview: 'A' },
          ].map((size) => (
            <button
              key={size.id}
              onClick={() => {
                handleSettingChange('fontSize', size.id);
                previewFontSize(size.id);
              }}
              className={`py-3 rounded-lg border flex flex-col items-center justify-center ${accessibilitySettings.fontSize === size.id ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              <div className={`${size.size} font-bold`}>{size.preview}</div>
              <div className="text-xs mt-1">{size.label}</div>
            </button>
          ))}
        </div>
        <button
          onClick={() => previewFontSize(accessibilitySettings.fontSize)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Preview Current Size
        </button>
      </div>

      <div>
        <h3 className="font-medium mb-3">Color Vision</h3>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { id: 'none', label: 'Default', desc: 'Normal color vision', color: 'from-blue-400 to-blue-600' },
            { id: 'protanopia', label: 'Protanopia', desc: 'Red-green (red weak)', color: 'from-yellow-400 to-brown-600' },
            { id: 'deuteranopia', label: 'Deuteranopia', desc: 'Red-green (green weak)', color: 'from-blue-400 to-purple-600' },
            { id: 'tritanopia', label: 'Tritanopia', desc: 'Blue-yellow', color: 'from-pink-400 to-red-600' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                handleSettingChange('colorBlindMode', mode.id);
                previewColorBlindMode(mode.id);
              }}
              className={`p-3 rounded-lg border text-left ${accessibilitySettings.colorBlindMode === mode.id ? 'bg-blue-100 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${mode.color}`}></div>
                <div>
                  <div className="font-medium">{mode.label}</div>
                  <div className="text-sm text-gray-600">{mode.desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={() => previewColorBlindMode(accessibilitySettings.colorBlindMode)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Preview Current Mode
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Accessibility Features</h3>
        
        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
          <div>
            <div className="font-medium">Keyboard Navigation</div>
            <div className="text-sm text-gray-600">Enable keyboard shortcuts and navigation</div>
          </div>
          <button
            onClick={() => handleSettingChange('keyboardNavigation', !accessibilitySettings.keyboardNavigation)}
            className={`w-12 h-6 rounded-full transition-colors relative ${accessibilitySettings.keyboardNavigation ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${accessibilitySettings.keyboardNavigation ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
          <div>
            <div className="font-medium">Require Alt Text</div>
            <div className="text-sm text-gray-600">Prompt for alt text when uploading images</div>
          </div>
          <button
            onClick={() => handleSettingChange('altTextRequired', !accessibilitySettings.altTextRequired)}
            className={`w-12 h-6 rounded-full transition-colors relative ${accessibilitySettings.altTextRequired ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${accessibilitySettings.altTextRequired ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
          <div>
            <div className="font-medium">Auto-caption Videos</div>
            <div className="text-sm text-gray-600">Generate captions for uploaded videos</div>
          </div>
          <button
            onClick={() => handleSettingChange('captionVideos', !accessibilitySettings.captionVideos)}
            className={`w-12 h-6 rounded-full transition-colors relative ${accessibilitySettings.captionVideos ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${accessibilitySettings.captionVideos ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
          <div>
            <div className="font-medium">Screen Reader Support</div>
            <div className="text-sm text-gray-600">Optimize for screen readers</div>
          </div>
          <button
            onClick={() => handleSettingChange('screenReader', !accessibilitySettings.screenReader)}
            className={`w-12 h-6 rounded-full transition-colors relative ${accessibilitySettings.screenReader ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transform transition-transform ${accessibilitySettings.screenReader ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="p-4 bg-green-50 rounded-lg">
        <h4 className="font-medium mb-2">Accessibility Tips</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Use high contrast mode in bright environments</li>
          <li>• Enable reduced motion if animations cause discomfort</li>
          <li>• Alt text helps visually impaired users understand images</li>
          <li>• Keyboard navigation assists motor-impaired users</li>
        </ul>
      </div>
    </div>
  );
}
