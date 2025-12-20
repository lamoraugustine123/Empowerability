'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PhotoUploadModal from './PhotoUploadModal';

export default function EnhancedProfileSlider({ isOpen, onClose, user }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    pronouns: '',
    birthday: '',
  });
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showCoverUpload, setShowCoverUpload] = useState(false);
  const [showProfileUpload, setShowProfileUpload] = useState(false);

  useEffect(() => {
    if (user) {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || 'Tell people about yourself...',
        location: user.location || '',
        website: user.website || '',
        pronouns: user.pronouns || '',
        birthday: user.birthday || '',
      });
      
      // Load photos from localStorage
      if (userData.coverPhoto) {
        setCoverPhoto(userData.coverPhoto);
      }
      if (userData.profilePhoto) {
        setProfilePhoto(userData.profilePhoto);
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save to localStorage and update user
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = { ...userData, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    window.location.reload(); // Refresh to show updated data
  };

  const handlePhotoUploadComplete = (imageData) => {
    if (imageData.type === 'cover') {
      setCoverPhoto(imageData);
    } else {
      setProfilePhoto(imageData);
    }
    
    // Update the user in localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    localStorage.setItem('user', JSON.stringify({ ...userData, [imageData.type === 'cover' ? 'coverPhoto' : 'profilePhoto']: imageData }));
  };

  const removePhoto = (type) => {
    if (type === 'cover') {
      setCoverPhoto(null);
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      delete userData.coverPhoto;
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      setProfilePhoto(null);
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      delete userData.profilePhoto;
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Calculate days since joining
  const getDaysSinceJoined = () => {
    const joinDate = new Date('2024-01-01'); // Default Jan 2024
    const today = new Date();
    const diffTime = Math.abs(today - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get friend count
  const getFriendCount = () => {
    return Math.floor(Math.random() * 100) + 200; // Random between 200-300
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Slider */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform">
        {/* Header with Cover Photo */}
        <div className="relative">
          {/* Cover Photo */}
          <div 
            className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"
            style={coverPhoto ? { backgroundImage: `url(${coverPhoto.url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            
            {/* Cover Photo Actions */}
            {isEditing && (
              <div className="absolute bottom-2 right-2 flex space-x-2">
                <button 
                  onClick={() => setShowCoverUpload(true)}
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 px-3 py-1 rounded-lg text-sm flex items-center space-x-1 transition-all"
                >
                  <span>📷</span>
                  <span>{coverPhoto ? 'Change' : 'Add'}</span>
                </button>
                {coverPhoto && (
                  <button 
                    onClick={() => removePhoto('cover')}
                    className="bg-red-500 bg-opacity-90 hover:bg-opacity-100 text-white px-3 py-1 rounded-lg text-sm flex items-center space-x-1 transition-all"
                  >
                    <span>🗑️</span>
                    <span>Remove</span>
                  </button>
                )}
              </div>
            )}
          </div>
          
          {/* Profile Picture Overlay */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                {profilePhoto ? (
                  <img 
                    src={profilePhoto.url} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0) || 'U'
                )}
              </div>
              
              {/* Profile Photo Actions */}
              {isEditing && (
                <div className="absolute -bottom-2 -right-2 flex space-x-1">
                  <button 
                    onClick={() => setShowProfileUpload(true)}
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <span className="text-sm">📷</span>
                  </button>
                  {profilePhoto && (
                    <button 
                      onClick={() => removePhoto('profile')}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <span className="text-sm">🗑️</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content after cover photo */}
        <div className="pt-16">
          {/* Tabs Navigation */}
          <div className="flex border-b">
            {['profile', 'friends', 'photos', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-center font-medium capitalize ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Scrollable Content */}
          <div className="h-[calc(100vh-280px)] overflow-y-auto">
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="p-6 space-y-6">
                {/* User Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold">{user?.name || 'LAMOR AUGUSTINE'}</h3>
                  <p className="text-gray-600">{user?.email || 'lamoraugustine122@gmail.com'}</p>
                  
                  {/* Stats */}
                  <div className="flex justify-center space-x-4 mt-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span>📍</span>
                      <span>{formData.location || 'Location not set'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>👥</span>
                      <span>{getFriendCount()} friends</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>📅</span>
                      <span>Joined {formatDate('2024-01-01')}</span>
                    </div>
                  </div>

                  {/* Days Active Badge */}
                  <div className="inline-flex items-center mt-3 px-3 py-1 bg-gradient-to-r from-green-100 to-blue-100 text-gray-800 rounded-full text-sm">
                    <span className="mr-2">🔥</span>
                    <span>Active for {getDaysSinceJoined()} days</span>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <div className="text-center">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <span>✏️</span>
                    <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
                  </button>
                </div>

                {/* Profile Form */}
                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="City, Country"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="https://yourwebsite.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pronouns
                        </label>
                        <input
                          type="text"
                          name="pronouns"
                          value={formData.pronouns}
                          onChange={handleInputChange}
                          placeholder="e.g., he/him, she/her, they/them"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Birthday
                        </label>
                        <input
                          type="date"
                          name="birthday"
                          value={formData.birthday}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <button
                        onClick={handleSave}
                        className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Display Bio */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-700 mb-2">Bio</h4>
                        <p className="text-gray-800">{formData.bio}</p>
                      </div>

                      {/* Additional Info Cards */}
                      {formData.pronouns && (
                        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600">👤</span>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Pronouns</div>
                            <div className="font-medium">{formData.pronouns}</div>
                          </div>
                        </div>
                      )}

                      {formData.website && (
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600">🔗</span>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Website</div>
                            <a 
                              href={formData.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 hover:underline"
                            >
                              Visit Website
                            </a>
                          </div>
                        </div>
                      )}

                      {formData.birthday && (
                        <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600">🎂</span>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Birthday</div>
                            <div className="font-medium">
                              {new Date(formData.birthday).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* FRIENDS TAB */}
            {activeTab === 'friends' && (
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Friends</h3>
                
                {/* Friends Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{getFriendCount()}</div>
                    <div className="text-sm text-gray-600">Total Friends</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">42</div>
                    <div className="text-sm text-gray-600">Online Now</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <div className="text-sm text-gray-600">Mutual Groups</div>
                  </div>
                </div>

                {/* Friend List */}
                <div className="space-y-3">
                  {['Sarah Johnson', 'Mike Chen', 'Emma Wilson', 'David Brown', 'Lisa Taylor', 'Alex Garcia'].map((friend, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full"></div>
                        <div>
                          <div className="font-medium">{friend}</div>
                          <div className="text-sm text-gray-500">12 mutual friends</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-xs text-gray-500">Online</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3 text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  See All Friends
                </button>
              </div>
            )}

            {/* PHOTOS TAB */}
            {activeTab === 'photos' && (
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Photos</h3>
                
                {/* Photo Management */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-lg text-white">
                    <div className="text-2xl font-bold">Cover Photos</div>
                    <div className="text-sm opacity-90">Manage your cover photos</div>
                    <button 
                      onClick={() => setShowCoverUpload(true)}
                      className="mt-3 bg-white text-blue-600 px-3 py-1 rounded text-sm hover:bg-gray-100 transition-colors"
                    >
                      {coverPhoto ? 'Change Cover' : 'Add Cover'}
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-teal-500 p-4 rounded-lg text-white">
                    <div className="text-2xl font-bold">Profile Photos</div>
                    <div className="text-sm opacity-90">Manage your profile pictures</div>
                    <button 
                      onClick={() => setShowProfileUpload(true)}
                      className="mt-3 bg-white text-green-600 px-3 py-1 rounded text-sm hover:bg-gray-100 transition-colors"
                    >
                      {profilePhoto ? 'Change Photo' : 'Add Photo'}
                    </button>
                  </div>
                </div>

                {/* Photo Grid */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Recent Uploads</h4>
                    <span className="text-sm text-gray-500">{coverPhoto || profilePhoto ? '1 photo' : 'No photos yet'}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {coverPhoto && (
                      <div className="aspect-square rounded-lg overflow-hidden relative group">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${coverPhoto.url})` }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button 
                            onClick={() => removePhoto('cover')}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                          >
                            🗑️
                          </button>
                        </div>
                        <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                          Cover
                        </div>
                      </div>
                    )}
                    
                    {profilePhoto && (
                      <div className="aspect-square rounded-full overflow-hidden relative group border-2 border-white shadow-md">
                        <img 
                          src={profilePhoto.url} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full">
                          <button 
                            onClick={() => removePhoto('profile')}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                          >
                            🗑️
                          </button>
                        </div>
                        <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1 rounded">
                          Profile
                        </div>
                      </div>
                    )}
                    
                    {/* Empty slots */}
                    {Array.from({ length: 4 - (coverPhoto ? 1 : 0) - (profilePhoto ? 1 : 0) }).map((_, idx) => (
                      <div key={idx} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">📷</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => setShowCoverUpload(true)}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                  >
                    <span>🖼️</span>
                    <span>Upload Cover Photo</span>
                  </button>
                  <button 
                    onClick={() => setShowProfileUpload(true)}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                  >
                    <span>👤</span>
                    <span>Upload Profile Photo</span>
                  </button>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Account Settings</h3>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium">Privacy Settings</div>
                    <div className="text-sm text-gray-600">Manage who can see your content</div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium">Notification Preferences</div>
                    <div className="text-sm text-gray-600">Customize your notifications</div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium">Accessibility Settings</div>
                    <div className="text-sm text-gray-600">Adjust for visual/audio needs</div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium">Photo Privacy</div>
                    <div className="text-sm text-gray-600">Control who sees your photos</div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium">Language & Region</div>
                    <div className="text-sm text-gray-600">Change language and timezone</div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium">Security & Login</div>
                    <div className="text-sm text-gray-600">Password, 2FA, and login alerts</div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium">Data & Permissions</div>
                    <div className="text-sm text-gray-600">Download your data</div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <button 
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      window.location.href = '/login';
                    }}
                    className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Upload Modals */}
      <PhotoUploadModal
        isOpen={showCoverUpload}
        onClose={() => setShowCoverUpload(false)}
        type="cover"
        onUploadComplete={handlePhotoUploadComplete}
      />
      
      <PhotoUploadModal
        isOpen={showProfileUpload}
        onClose={() => setShowProfileUpload(false)}
        type="profile"
        onUploadComplete={handlePhotoUploadComplete}
      />
    </>
  );
}
