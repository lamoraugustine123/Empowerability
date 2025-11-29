import { useState, useEffect } from 'react';

export default function ProfilePosts() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const samplePosts = [
          {
            id: 1,
            content: 'Just joined this amazing community! Looking forward to connecting with everyone. 🌟',
            timestamp: '2 hrs',
            likes: 12,
            comments: [
              { id: 1, user: 'Sarah Johnson', text: 'Welcome to the community! 👋', time: '1h', likes: 2 },
              { id: 2, user: 'Mike Chen', text: 'Great to have you here!', time: '45m', likes: 1 }
            ],
            user: { name: 'You', avatar: 'U' },
            isLiked: false,
            shares: 3
          },
          {
            id: 2,
            content: 'Sharing my journey with visual impairment and how technology has helped me stay connected. #Accessibility #TechForGood',
            timestamp: '1 d',
            likes: 24,
            comments: [
              { id: 1, user: 'Emily Davis', text: 'This is so inspiring! Thank you for sharing.', time: '20h', likes: 5 },
              { id: 2, user: 'Alex Rodriguez', text: 'What assistive tech do you use?', time: '18h', likes: 3 },
              { id: 3, user: 'You', text: 'I use screen readers and voice control software!', time: '17h', likes: 8 }
            ],
            user: { name: 'You', avatar: 'U' },
            isLiked: true,
            shares: 8
          },
          {
            id: 3,
            content: 'Beautiful day at the accessibility conference! Met so many inspiring people. 💪',
            timestamp: '3 d',
            likes: 45,
            comments: [
              { id: 1, user: 'Priya Patel', text: 'Wish I could have been there!', time: '2d', likes: 3 }
            ],
            user: { name: 'You', avatar: 'U' },
            isLiked: false,
            shares: 12
          }
        ];
        
        setPosts(samplePosts);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      comments: [],
      user: { name: 'You', avatar: 'U' },
      isLiked: false,
      shares: 0
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');
  };

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked
          }
        : post
    ));
  };

  const handleCommentSubmit = (postId, e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: 'You',
      text: commentText,
      time: 'Just now',
      likes: 0
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));

    setCommentText('');
    setActiveCommentPost(null);
  };

  const handleCommentLike = (postId, commentId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, likes: comment.likes + 1 }
                : comment
            )
          }
        : post
    ));
  };

  const toggleComments = (postId) => {
    setActiveCommentPost(activeCommentPost === postId ? null : postId);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-4">
            <div className="animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-sm">
          {/* Post Header */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {post.user.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{post.user.name}</h4>
                  <p className="text-sm text-gray-500">{post.timestamp} · 🌍</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center">
                ⋯
              </button>
            </div>

            {/* Post Content */}
            <div className="mt-3">
              <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
            </div>
          </div>

          {/* Post Stats */}
          <div className="px-4 py-2 border-t border-b text-sm text-gray-500 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>👍</span>
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{post.comments.length} comments</span>
              <span>{post.shares} shares</span>
            </div>
          </div>

          {/* Post Actions - Facebook Style */}
          <div className="px-4 py-1 flex items-center justify-between text-gray-500 text-sm font-medium">
            <button 
              onClick={() => handleLike(post.id)}
              className={`flex items-center space-x-2 flex-1 justify-center py-2 rounded-lg hover:bg-gray-100 transition-colors ${
                post.isLiked ? 'text-blue-600' : ''
              }`}
            >
              <span>{post.isLiked ? '👍' : '👍'}</span>
              <span>Like</span>
            </button>
            <button 
              onClick={() => toggleComments(post.id)}
              className="flex items-center space-x-2 flex-1 justify-center py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span>💬</span>
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-2 flex-1 justify-center py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <span>🔄</span>
              <span>Share</span>
            </button>
          </div>

          {/* Comments Section */}
          {activeCommentPost === post.id && (
            <div className="border-t px-4 py-3 bg-gray-50">
              {/* Existing Comments */}
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3 mb-3 last:mb-0">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    {comment.user.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl px-3 py-2">
                      <div className="flex items-baseline space-x-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900">{comment.user}</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-gray-800 text-sm">{comment.text}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 px-2">
                      <button 
                        onClick={() => handleCommentLike(post.id, comment.id)}
                        className="text-xs text-gray-500 hover:text-blue-600 transition-colors font-medium"
                      >
                        Like
                      </button>
                      <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors font-medium">
                        Reply
                      </button>
                      <span className="text-xs text-gray-400">{comment.likes}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Comment Form */}
              <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="flex space-x-3 mt-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  Y
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="text-blue-500 hover:text-blue-600 disabled:text-gray-400 font-medium text-sm"
                >
                  Post
                </button>
              </form>
            </div>
          )}

          {/* View Comments Button (when collapsed) */}
          {post.comments.length > 0 && activeCommentPost !== post.id && (
            <button 
              onClick={() => toggleComments(post.id)}
              className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 border-t"
            >
              View {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
