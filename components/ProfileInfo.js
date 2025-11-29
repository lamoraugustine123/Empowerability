import { useState } from 'react';

export default function ProfileInfo() {
  const [user] = useState({
    location: 'City, Country',
    joined: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
    disabilityType: 'Visual Impairment',
    interests: ['Technology', 'Music', 'Accessibility', 'Travel'],
    website: 'example.com'
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
      
      <div className="space-y-4">
        {/* Location */}
        <div className="flex items-center space-x-3">
          <span className="text-gray-400">📍</span>
          <div>
            <div className="text-sm text-gray-500">Location</div>
            <div className="text-gray-900">{user.location}</div>
          </div>
        </div>

        {/* Joined Date */}
        <div className="flex items-center space-x-3">
          <span className="text-gray-400">📅</span>
          <div>
            <div className="text-sm text-gray-500">Joined</div>
            <div className="text-gray-900">{user.joined}</div>
          </div>
        </div>

        {/* Disability Type */}
        <div className="flex items-center space-x-3">
          <span className="text-gray-400">♿</span>
          <div>
            <div className="text-sm text-gray-500">Disability Type</div>
            <div className="text-gray-900">{user.disabilityType}</div>
          </div>
        </div>

        {/* Interests */}
        <div className="flex items-start space-x-3">
          <span className="text-gray-400 mt-1">🎯</span>
          <div>
            <div className="text-sm text-gray-500 mb-2">Interests</div>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Website */}
        {user.website && (
          <div className="flex items-center space-x-3">
            <span className="text-gray-400">🌐</span>
            <div>
              <div className="text-sm text-gray-500">Website</div>
              <a href={`https://${user.website}`} className="text-blue-500 hover:text-blue-600">
                {user.website}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
