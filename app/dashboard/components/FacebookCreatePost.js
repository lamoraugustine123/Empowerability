'use client';
import { useState, useEffect } from 'react';

export default function FacebookCreatePost() {
  const [user, setUser] = useState(null);
  const [postContent, setPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    setIsLoading(true);
    
    try {
      // In real app, make API call to create post
      console.log('Creating post:', postContent);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear form
      setPostContent('');
      
      // Show success message
      alert('Post created successfully!');
      
      // In real app, refresh posts or update state
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('postCreated'));
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = () => {
    console.log('Image upload clicked');
    // In real app, open file picker
  };

  const handleFeelingActivity = () => {
    console.log('Feeling/activity clicked');
    // In real app, open feeling selector
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            placeholder={`What's on your mind, ${user?.name?.split(' ')[0] || 'friend'}?`}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full bg-gray-100 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </form>
      </div>
      
      <div className="flex justify-between border-t pt-4">
        <button
          onClick={handleImageUpload}
          className="flex-1 flex items-center justify-center space-x-2 text-gray-600 hover:bg-gray-100 py-2 rounded-lg transition-colors"
          disabled={isLoading}
        >
          <span className="text-lg">📷</span>
          <span className="font-medium">Photo/Video</span>
        </button>
        
        <button
          onClick={handleFeelingActivity}
          className="flex-1 flex items-center justify-center space-x-2 text-gray-600 hover:bg-gray-100 py-2 rounded-lg transition-colors"
          disabled={isLoading}
        >
          <span className="text-lg">😊</span>
          <span className="font-medium">Feeling/Activity</span>
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={!postContent.trim() || isLoading}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg transition-colors ${
            !postContent.trim() || isLoading
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Posting...</span>
            </>
          ) : (
            <>
              <span className="text-lg">📝</span>
              <span className="font-medium">Post</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
