'use client';
import { useState, useEffect } from 'react';

export default function DashboardStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const userStories = [
      {
        id: 1,
        user: 'You',
        type: 'image',
        preview: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=150',
        content: 'Create Story',
        createdAt: new Date(),
        views: 150,
        isViewed: false
      },
      {
        id: 2,
        user: 'Sarah Johnson',
        type: 'image',
        preview: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=150',
        content: 'Beautiful sunset 🌅',
        createdAt: new Date(Date.now() - 3600000),
        views: 89,
        isViewed: true
      },
      {
        id: 3,
        user: 'Mike Chen',
        type: 'video',
        preview: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150',
        content: 'Morning hike 🏞️',
        createdAt: new Date(Date.now() - 7200000),
        views: 45,
        isViewed: false
      },
      {
        id: 4,
        user: 'Emily Davis',
        type: 'image',
        preview: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150',
        content: 'Coffee time ☕',
        createdAt: new Date(Date.now() - 10800000),
        views: 67,
        isViewed: true
      },
      {
        id: 5,
        user: 'Alex Rodriguez',
        type: 'video',
        preview: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150',
        content: 'New project 🚀',
        createdAt: new Date(Date.now() - 14400000),
        views: 32,
        isViewed: false
      }
    ];
    setStories(userStories);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {/* Create Story Card */}
        <div className="flex-shrink-0 w-32 h-48 relative rounded-xl overflow-hidden cursor-pointer shadow-sm group">
          <div 
            className="w-full h-40 bg-gradient-to-br from-blue-400 to-purple-500"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=300)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute top-2 left-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white border-4 border-white">
              <span className="text-lg">+</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white p-2 text-center">
            <p className="text-sm font-semibold text-gray-900">Create Story</p>
          </div>
        </div>

        {/* Friend Stories */}
        {stories.filter(s => s.user !== 'You').map((story) => (
          <div 
            key={story.id} 
            className="flex-shrink-0 w-32 h-48 relative rounded-xl overflow-hidden cursor-pointer shadow-sm group"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${story.preview})`,
                filter: story.isViewed ? 'brightness(0.8)' : 'brightness(1)'
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* User Avatar */}
              <div className="absolute top-2 left-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white border-2 border-white">
                {story.user.charAt(0)}
              </div>
              
              {/* Story Content */}
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-sm font-semibold truncate">{story.user}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
