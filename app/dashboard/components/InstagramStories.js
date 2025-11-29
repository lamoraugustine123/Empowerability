'use client';
import { useState } from 'react';

export default function InstagramStories({ stories, onStoryClick }) {
  const [activeStory, setActiveStory] = useState(null);

  const handleStoryClick = (story) => {
    setActiveStory(story);
    onStoryClick?.(story);
  };

  if (activeStory) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="relative w-full h-full max-w-md mx-auto">
          {/* Story Content */}
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=400)`
            }}
          >
            {/* Story Header */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {activeStory.user.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{activeStory.user.name}</p>
                  <p className="text-white/80 text-xs">{activeStory.user.username}</p>
                </div>
                <div className="flex-1"></div>
                <button 
                  onClick={() => setActiveStory(null)}
                  className="text-white text-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-14 left-4 right-4 h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full animate-pulse"></div>
            </div>

            {/* Action Buttons */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold">
                💬
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold">
                ❤️
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold">
                📤
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 border-b border-gray-300 overflow-x-auto">
      <div className="flex space-x-4">
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="flex flex-col items-center space-y-2 flex-shrink-0 cursor-pointer"
            onClick={() => handleStoryClick(story)}
          >
            <div className={`w-16 h-16 rounded-full p-0.5 ${
              story.user.hasNewStory 
                ? 'bg-gradient-to-tr from-yellow-400 to-purple-600 story-ring' 
                : 'bg-gray-300'
            }`}>
              <div className="w-full h-full bg-white rounded-full p-0.5">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {story.user.avatar}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-600 max-w-16 truncate">
              {story.user.isYourStory ? 'Your Story' : story.user.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
