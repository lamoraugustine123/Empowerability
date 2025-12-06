'use client';
import { useState, useEffect } from 'react';

export default function FacebookStoriesBar() {
  const [stories, setStories] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }

    // Mock stories data
    setStories([
      { 
        id: 1, 
        name: 'You', 
        userInitial: user?.name?.charAt(0) || 'U', 
        hasStory: true, 
        isAdd: true,
        bgColor: 'bg-gradient-to-r from-blue-400 to-purple-500'
      },
      { 
        id: 2, 
        name: 'Alex', 
        userInitial: 'A', 
        hasStory: true,
        bgColor: 'bg-gradient-to-r from-pink-400 to-red-500'
      },
      { 
        id: 3, 
        name: 'Maria', 
        userInitial: 'M', 
        hasStory: true,
        bgColor: 'bg-gradient-to-r from-green-400 to-blue-500'
      },
      { 
        id: 4, 
        name: 'John', 
        userInitial: 'J', 
        hasStory: false,
        bgColor: 'bg-gray-300'
      },
      { 
        id: 5, 
        name: 'Sarah', 
        userInitial: 'S', 
        hasStory: true,
        bgColor: 'bg-gradient-to-r from-yellow-400 to-orange-500'
      },
      { 
        id: 6, 
        name: 'Mike', 
        userInitial: 'M', 
        hasStory: true,
        bgColor: 'bg-gradient-to-r from-purple-400 to-pink-500'
      },
    ]);
  }, [user]);

  const handleCreateStory = () => {
    console.log('Create story clicked');
    // In real app, open story creation modal
  };

  const handleViewStory = (storyId) => {
    console.log(`View story ${storyId}`);
    // In real app, open story viewer
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">Stories</h2>
        <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
          See All →
        </button>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="flex-shrink-0 w-28 cursor-pointer"
            onClick={() => story.isAdd ? handleCreateStory() : handleViewStory(story.id)}
          >
            <div className={`relative w-28 h-48 rounded-xl overflow-hidden ${
              story.hasStory ? 'ring-2 ring-blue-500 ring-offset-2' : ''
            }`}>
              {/* Background */}
              <div className={`absolute inset-0 ${story.bgColor} ${
                story.hasStory ? 'opacity-100' : 'opacity-50'
              }`}></div>
              
              {/* Content */}
              <div className="relative h-full p-3 flex flex-col justify-between">
                {story.isAdd ? (
                  <>
                    <div className="flex justify-center items-center h-3/4">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <span className="text-3xl text-blue-500">+</span>
                      </div>
                    </div>
                    <div className="text-center text-white font-bold">
                      Create Story
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full border-4 border-blue-500 bg-white flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-800">{story.userInitial}</span>
                    </div>
                    <div className="text-white text-sm font-bold">
                      {story.name}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
