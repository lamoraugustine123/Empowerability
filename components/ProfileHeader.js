import { useState } from 'react';

export default function ProfileHeader() {
  const [user] = useState({
    name: 'User Name',
    username: '@username',
    bio: 'This is a sample bio. In the real app, this would come from your user data.',
    isVerified: true,
    followers: 124,
    following: 89,
    posts: 12
  });

  const handleImageUpload = (event, type) => {
    console.log(`${type} image upload triggered`);
    // Actual implementation would handle file upload
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Cover Photo */}
      <div className="relative h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg">
        <button 
          onClick={(e) => handleImageUpload(e, 'cover')}
          className="absolute top-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-2 rounded-lg text-sm font-medium transition-all"
        >
          📷 Edit Cover
        </button>
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        {/* Profile Picture */}
        <div className="flex justify-between items-end -mt-12 mb-4">
          <div className="flex items-end space-x-4">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full p-1">
                <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.charAt(0)}
                </div>
              </div>
              <button 
                onClick={(e) => handleImageUpload(e, 'profile')}
                className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm">📷</span>
              </button>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-1">
            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
            {user.isVerified && (
              <span className="text-blue-500" title="Verified">✓</span>
            )}
          </div>
          <p className="text-gray-600 mb-2">{user.username}</p>
          <p className="text-gray-700">{user.bio}</p>
        </div>

        {/* Stats */}
        <div className="flex space-x-6 text-sm">
          <div className="text-center">
            <div className="font-semibold text-gray-900">{user.posts}</div>
            <div className="text-gray-500">Posts</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">{user.followers}</div>
            <div className="text-gray-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">{user.following}</div>
            <div className="text-gray-500">Following</div>
          </div>
        </div>
      </div>
    </div>
  );
}
