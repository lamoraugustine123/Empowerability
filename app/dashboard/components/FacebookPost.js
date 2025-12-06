'use client';
import { useState, useEffect } from 'react';

export default function FacebookPost({ post }) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [commentCount, setCommentCount] = useState(post.comments || 0);
  const [shareCount, setShareCount] = useState(post.shares || 0);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState(post.commentsList || []);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleShare = () => {
    setShareCount(prev => prev + 1);
    // In real app, open share modal
    console.log('Sharing post:', post.id);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In real app, make API call
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = {
      id: comments.length + 1,
      author: 'You',
      authorInitial: 'Y',
      content: commentInput,
      time: 'Just now',
      likes: 0
    };

    setComments([newComment, ...comments]);
    setCommentCount(prev => prev + 1);
    setCommentInput('');
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffMs = now - postTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return postTime.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
              post.authorColor || 'bg-blue-500'
            }`}>
              {post.authorInitial}
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <div className="font-bold text-gray-900">{post.author}</div>
                {post.isVerified && (
                  <span className="text-blue-500" title="Verified">✓</span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{formatTime(post.timestamp)}</span>
                <span>·</span>
                <span className="flex items-center">
                  {post.privacy === 'public' ? '🌍 Public' : '👥 Friends'}
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <button 
              onClick={handleSave}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
              title={isSaved ? 'Unsave post' : 'Save post'}
            >
              {isSaved ? '🔖' : '📑'}
            </button>
            <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
              ⋯
            </button>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4">
        <p className="text-gray-800 mb-3">{post.content}</p>
        
        {post.image && (
          <div className="rounded-lg overflow-hidden mb-3">
            <img 
              src={post.image} 
              alt="Post" 
              className="w-full h-auto max-h-96 object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Post Stats */}
      <div className="px-4 py-3 border-t">
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <span className="flex items-center">
                <span className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">👍</span>
                <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center ml-[-5px]">❤️</span>
              </span>
              <span>{likeCount}</span>
            </div>
            <div>
              {commentCount} comments · {shareCount} shares
            </div>
          </div>
        </div>

        {/* Post Actions */}
        <div className="flex border-t pt-2">
          <button
            onClick={handleLike}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg transition-colors ${
              isLiked ? 'text-blue-500 hover:bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="text-lg">{isLiked ? '👍' : '👍'}</span>
            <span className="font-medium">{isLiked ? 'Liked' : 'Like'}</span>
          </button>
          
          <button
            onClick={handleComment}
            className="flex-1 flex items-center justify-center space-x-2 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <span className="text-lg">💬</span>
            <span className="font-medium">Comment</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center space-x-2 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <span className="text-lg">🔄</span>
            <span className="font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t px-4 py-3 bg-gray-50">
          {/* Add Comment */}
          <form onSubmit={handleSubmitComment} className="mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">Y</span>
              </div>
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className={`px-4 py-2 text-sm rounded-full ${
                  commentInput.trim()
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Post
              </button>
            </div>
          </form>

          {/* Comments List */}
          {comments.length > 0 ? (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">{comment.authorInitial}</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-lg p-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-bold text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-800">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-sm py-4">No comments yet. Be the first to comment!</p>
          )}
        </div>
      )}
    </div>
  );
}
