'use client';
import { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../context/AuthContext'; // Temporarily disabled
import DashboardStories from "./components/DashboardStories";
import CreateShortModal from './components/CreateShortModal';
import EnhancedProfileModal from './components/EnhancedProfileModal';
import InstagramStories from './components/InstagramStories';

// Facebook-style components
import FacebookSidebar from './components/FacebookSidebar';
import FacebookStoriesBar from './components/FacebookStoriesBar';
import FacebookCreatePost from './components/FacebookCreatePost';
import FacebookPost from './components/FacebookPost';

export default function FacebookDashboard() {
  // TEMPORARY: Enhanced mock user with Facebook-like properties
  const mockUser = {
    id: 1,
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
    role: 'Community Member',
    bio: 'Disability advocate & accessibility enthusiast. Making the world more inclusive one step at a time.',
    location: 'San Francisco, CA',
    joinedDate: 'Joined January 2023',
    disabilityType: 'Visual Impairment',
    isVerified: true,
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    avatarInitials: 'TU',
    stats: {
      friends: 245,
      following: 156,
      followers: 289,
      posts: 42
    },
    isOnline: true,
    badges: ['🏆 Top Contributor', '🌟 Community Leader', '💬 Active Member'],
    work: 'Accessibility Consultant',
    education: 'Stanford University',
    relationship: 'In a relationship',
    birthday: 'April 15'
  };
  
  // Use mock user instead of real auth
  const user = mockUser;
  // const { user } = useAuth(); // Commented out for testing
  
  // State management
  const [posts, setPosts] = useState([]);
  const [showShortModal, setShowShortModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeNav, setActiveNav] = useState('home');
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Comment system states
  const [commentTexts, setCommentTexts] = useState({});
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [reactionsMenu, setReactionsMenu] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Facebook-like navigation items (matches actual Facebook)
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home', active: true, href: '#', customIcon: true },
    { id: 'watch', icon: '🎬', label: 'Watch', count: 9, href: '#', customIcon: true },
    { id: 'marketplace', icon: '🏪', label: 'Marketplace', href: '#', customIcon: true },
    { id: 'groups', icon: '👥', label: 'Groups', count: 5, href: '#', customIcon: true },
    { id: 'gaming', icon: '🎮', label: 'Gaming', href: '#', customIcon: true }
  ];

  const shortcuts = [
    { icon: '👨‍👩‍👧‍👦', label: 'Friends', href: '/friends' },
    { icon: '📚', label: 'Learning', href: '/learning' },
    { icon: '🎉', label: 'Events', href: '/events' },
    { icon: '📢', label: 'Ads Manager', href: '/ads' },
    { icon: '🩺', label: 'Health', href: '/health' },
    { icon: '🌱', label: 'Climate', href: '/climate' }
  ];

  // Facebook reactions
  const reactions = [
    { type: 'like', emoji: '👍', label: 'Like', color: 'text-blue-600' },
    { type: 'love', emoji: '❤️', label: 'Love', color: 'text-red-500' },
    { type: 'care', emoji: '🥰', label: 'Care', color: 'text-yellow-500' },
    { type: 'haha', emoji: '😄', label: 'Haha', color: 'text-yellow-500' },
    { type: 'wow', emoji: '😯', label: 'Wow', color: 'text-yellow-500' },
    { type: 'sad', emoji: '😢', label: 'Sad', color: 'text-yellow-500' },
    { type: 'angry', emoji: '😠', label: 'Angry', color: 'text-red-600' }
  ];

  // Mock data - Facebook-style posts
  useEffect(() => {
    const samplePosts = [
      {
        id: 1,
        user: {
          name: 'Sarah Johnson',
          username: 'sarahj',
          avatar: 'SJ',
          avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
          role: 'Wheelchair User & Advocate',
          timestamp: '2 hrs ago',
          privacy: 'Public'
        },
        content: 'Just discovered an amazing accessible coffee shop downtown! Full ramp access, spacious seating, and amazing staff who are trained in disability awareness. Highly recommend! #AccessibilityWin #WheelchairLife',
        image: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=800',
        likes: 24,
        comments: 8,
        shares: 3,
        isLiked: false,
        reactionType: null,
        type: 'post',
        commentsList: [
          {
            id: 101,
            user: 'Mike Chen',
            username: 'mikec',
            text: 'That\'s amazing! Where is it located?',
            time: '1 hr ago',
            avatar: 'MC',
            likes: 2,
            isLiked: false
          },
          {
            id: 102,
            user: 'Lisa Park',
            username: 'lisap',
            text: 'I\'ve been there! The staff is wonderful and they have braille menus too!',
            time: '45 min ago',
            avatar: 'LP',
            likes: 1,
            isLiked: true
          }
        ]
      },
      {
        id: 2,
        user: {
          name: 'Mike Chen',
          username: 'mikec',
          avatar: 'MC',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w-400',
          role: 'Visual Impairment Community',
          timestamp: '4 hrs ago',
          privacy: 'Friends'
        },
        content: 'Sharing some great screen reader tips I learned in our support group meeting yesterday. DM me if you want the full notes! #BlindCommunity #TechTips #Accessibility',
        image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800',
        likes: 31,
        comments: 12,
        shares: 5,
        isLiked: true,
        reactionType: 'love',
        type: 'post',
        commentsList: [
          {
            id: 201,
            user: 'David Kim',
            username: 'davidk',
            text: 'Would love the notes! Thanks Mike!',
            time: '3 hrs ago',
            avatar: 'DK',
            likes: 0,
            isLiked: false
          }
        ]
      },
      {
        id: 3,
        user: {
          name: 'Accessibility News',
          username: 'accessibilitynews',
          avatar: 'AN',
          avatarUrl: 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=400',
          role: 'Verified Organization',
          timestamp: '6 hrs ago',
          privacy: 'Public'
        },
        content: 'New legislation passed requiring all public websites to meet WCAG 2.1 AA standards by 2025. This is a huge win for digital accessibility! What are your thoughts? #DigitalAccessibility #WCAG #Inclusion',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        likes: 142,
        comments: 28,
        shares: 45,
        isLiked: false,
        reactionType: 'wow',
        type: 'news',
        commentsList: []
      }
    ];

    // Simulate loading
    setTimeout(() => {
      setPosts(samplePosts);
      setIsLoading(false);
    }, 500);
  }, []);

  // ========== FACEBOOK-STYLE INTERACTIONS ==========

  const handleReaction = (postId, reactionType) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const wasLiked = post.isLiked || post.reactionType;
        const currentReaction = post.reactionType;
        
        // If clicking the same reaction, remove it
        if (currentReaction === reactionType) {
          return {
            ...post,
            likes: post.likes - 1,
            isLiked: false,
            reactionType: null
          };
        }
        
        // If switching reactions
        const likesChange = wasLiked ? 0 : 1;
        
        return {
          ...post,
          likes: post.likes + likesChange,
          isLiked: true,
          reactionType: reactionType
        };
      }
      return post;
    }));
    setReactionsMenu(null);
  };

  const handleAddComment = (postId) => {
    const text = commentTexts[postId] || '';
    
    if (!text.trim()) {
      alert('Please enter a comment');
      return;
    }
    
    const newComment = {
      id: Date.now(),
      user: user.name || 'You',
      username: user.username || 'you',
      text: text,
      time: 'Just now',
      avatar: user.avatarInitials || 'U',
      likes: 0,
      isLiked: false
    };
    
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const currentComments = post.comments || 0;
          const currentCommentsList = post.commentsList || [];
          
          return {
            ...post,
            comments: currentComments + 1,
            commentsList: [...currentCommentsList, newComment]
          };
        }
        return post;
      })
    );
    
    setCommentTexts(prev => ({ ...prev, [postId]: '' }));
    setActiveCommentPost(null);
  };

  const handleShare = (postId) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    setPosts(prev => prev.map(p => 
      p.id === postId 
        ? { ...p, shares: (p.shares || 0) + 1 }
        : p
    ));
    
    const shareUrl = `${window.location.origin}/post/${postId}`;
    const shareText = `Check out this post from ${post.user.name}: ${post.content.substring(0, 100)}...`;
    
    // Facebook-style share options
    if (window.confirm(`Share "${post.content.substring(0, 50)}..."?\n\nShare to:\n1. Your Story\n2. News Feed\n3. Group\n4. Messenger\n5. Copy Link`)) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Link copied to clipboard!');
      }).catch(err => {
        console.log('Clipboard failed:', err);
      });
    }
  };

  const handleCreatePost = () => {
    if (!newPostText.trim() && !selectedImage) {
      alert('Please enter some text or add an image');
      return;
    }

    const newPost = {
      id: Date.now(),
      user: {
        name: user.name || 'You',
        username: user.username || 'you',
        avatar: user.avatarInitials || 'U',
        avatarUrl: user.profileImage,
        role: user.role || 'Community Member',
        timestamp: 'Just now',
        privacy: 'Public'
      },
      content: newPostText,
      image: selectedImage,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      reactionType: null,
      type: 'post',
      commentsList: []
    };

    setPosts(prev => [newPost, ...prev]);
    setNewPostText('');
    setSelectedImage(null);
  };

  const handleCommentChange = (postId, text) => {
    setCommentTexts(prev => ({ ...prev, [postId]: text }));
  };

  const toggleCommentInput = (postId) => {
    setActiveCommentPost(activeCommentPost === postId ? null : postId);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Facebook-style loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Facebook Header Skeleton */}
        <div className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="flex-1 max-w-2xl mx-4">
              <div className="w-full h-10 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="pt-16 max-w-7xl mx-auto px-4">
          <div className="flex space-x-4 pt-4">
            {/* Left Sidebar Skeleton */}
            <div className="hidden lg:block w-64 space-y-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-full h-16 bg-gray-300 rounded animate-pulse"></div>
              ))}
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1 max-w-2xl mx-auto space-y-4">
              {/* Create Post Skeleton */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="flex-1 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Posts Skeleton */}
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-lg shadow">
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <div className="w-32 h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
                        <div className="w-24 h-3 bg-gray-300 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="mt-4 w-full h-48 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Sidebar Skeleton */}
            <div className="hidden xl:block w-80 space-y-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-full h-32 bg-gray-300 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Facebook-style Top Navigation Bar */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 h-14 flex items-center justify-between">
          {/* Left: Logo and Search */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Logo/Facebook icon */}
            <a href="/" className="text-blue-600 text-2xl font-bold">f</a>
            
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search EmpowerAbility"
                className="w-64 lg:w-80 pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Center: Main Navigation (Desktop) */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveNav(item.id);
                }}
                className={`flex flex-col items-center justify-center h-14 px-4 sm:px-6 ${
                  activeNav === item.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs mt-1">{item.label}</span>
                {item.count && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Right: User Menu & Notifications */}
          <div className="flex items-center space-x-2">
            {/* Create Button */}
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <span className="text-xl">+</span>
            </button>
            
            {/* Messenger */}
            <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <span className="text-xl">💬</span>
              {messages > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {messages}
                </span>
              )}
            </button>
            
            {/* Notifications */}
            <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <span className="text-xl">🔔</span>
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            
            {/* User Menu */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100"
                onClick={() => setShowProfileModal(true)}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user.avatarInitials}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40">
        <div className="flex justify-around items-center h-14">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`flex flex-col items-center justify-center h-full flex-1 ${
                activeNav === item.id ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-14 pb-14 md:pb-0 max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex flex-col lg:flex-row gap-4 pt-4">
          {/* Left Sidebar - Desktop Only */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20 space-y-4">
              {/* User Profile Card */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4">
                  <a href="/profile" className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.avatarInitials}
                    </div>
                    <span className="font-semibold">{user.name}</span>
                  </a>
                  
                  {/* Shortcuts */}
                  <div className="mt-4 space-y-2">
                    {shortcuts.slice(0, 6).map((shortcut) => (
                      <a
                        key={shortcut.label}
                        href={shortcut.href}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                      >
                        <span className="text-xl">{shortcut.icon}</span>
                        <span>{shortcut.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sponsored */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Sponsored</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="w-full h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg"></div>
                    <div className="text-sm font-medium">Accessibility Tools 2024</div>
                    <div className="text-xs text-gray-500">accessibilitytools.com</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Feed - Facebook Style */}
          <div className="flex-1 max-w-2xl mx-auto w-full">
            {/* Stories */}
            <div className="mb-4">
              <DashboardStories />
            </div>

            {/* Create Post */}
            <div className="bg-white rounded-lg shadow mb-4 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.avatarInitials}
                </div>
                <button
                  onClick={() => document.getElementById('postInput').focus()}
                  className="flex-1 text-left px-4 py-3 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-500"
                >
                  What's on your mind, {user.name.split(' ')[0]}?
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-2">
                <button className="flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
                  <span className="text-xl text-green-600">📷</span>
                  <span className="font-medium">Photo/Video</span>
                </button>
                <button 
                  onClick={() => setShowShortModal(true)}
                  className="flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  <span className="text-xl text-red-600">🎥</span>
                  <span className="font-medium">Short</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
                  <span className="text-xl text-yellow-600">😊</span>
                  <span className="font-medium">Feeling</span>
                </button>
              </div>

              {/* Hidden Post Input */}
              <div className={`mt-4 ${newPostText || selectedImage ? 'block' : 'hidden'}`}>
                <textarea
                  id="postInput"
                  placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`}
                  className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="3"
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                />
                
                {selectedImage && (
                  <div className="mt-3 relative">
                    <img src={selectedImage} alt="Preview" className="w-full h-auto rounded-lg" />
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                )}
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <label className="cursor-pointer p-2 rounded-full hover:bg-gray-100">
                      <span className="text-xl">📷</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <span className="text-xl">😊</span>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <span className="text-xl">📍</span>
                    </button>
                  </div>
                  <button
                    onClick={handleCreatePost}
                    disabled={!newPostText.trim() && !selectedImage}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow">
                  {/* Post Header */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {post.user.avatar}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-semibold text-gray-900">{post.user.name}</h4>
                            {post.user.role.includes('Verified') && (
                              <span className="ml-1 text-blue-500" title="Verified">✓</span>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{post.user.timestamp}</span>
                            <span className="mx-1">•</span>
                            <span>{post.user.privacy}</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 rounded-full hover:bg-gray-100">
                        <span className="text-xl">⋯</span>
                      </button>
                    </div>
                    
                    {/* Post Content */}
                    <div className="mt-3">
                      <p className="text-gray-900 whitespace-pre-line">{post.content}</p>
                    </div>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <div className="w-full">
                      <img 
                        src={post.image} 
                        alt="Post content"
                        className="w-full h-auto max-h-96 object-cover"
                      />
                    </div>
                  )}

                  {/* Post Stats */}
                  <div className="px-4 py-2 border-t text-sm text-gray-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white"></div>
                          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                          <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <span>{post.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex space-x-4">
                        <span>{post.comments} comments</span>
                        <span>{post.shares} shares</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Actions */}
                  <div className="px-2 border-t">
                    <div className="grid grid-cols-3">
                      {/* Like Button with Reactions */}
                      <div className="relative">
                        <button
                          onClick={() => handleReaction(post.id, 'like')}
                          onMouseEnter={() => setReactionsMenu(post.id)}
                          onMouseLeave={() => setTimeout(() => setReactionsMenu(null), 300)}
                          className={`flex items-center justify-center space-x-2 py-3 w-full hover:bg-gray-50 rounded-lg ${
                            post.isLiked ? 'text-blue-600' : 'text-gray-600'
                          }`}
                        >
                          <span className="text-xl">
                            {post.reactionType === 'love' ? '❤️' : 
                             post.reactionType === 'care' ? '🥰' :
                             post.reactionType === 'haha' ? '😄' :
                             post.reactionType === 'wow' ? '😯' :
                             post.reactionType === 'sad' ? '😢' :
                             post.reactionType === 'angry' ? '😠' : '👍'}
                          </span>
                          <span className="font-medium">
                            {post.reactionType ? 
                              reactions.find(r => r.type === post.reactionType)?.label : 'Like'}
                          </span>
                        </button>
                        
                        {/* Reactions Hover Menu */}
                        {reactionsMenu === post.id && (
                          <div 
                            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-full shadow-lg p-2 flex space-x-1 border"
                            onMouseEnter={() => setReactionsMenu(post.id)}
                            onMouseLeave={() => setReactionsMenu(null)}
                          >
                            {reactions.map((reaction) => (
                              <button
                                key={reaction.type}
                                onClick={() => handleReaction(post.id, reaction.type)}
                                className="w-10 h-10 text-2xl hover:scale-125 transition-transform"
                                title={reaction.label}
                              >
                                {reaction.emoji}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Comment Button */}
                      <button
                        onClick={() => toggleCommentInput(post.id)}
                        className="flex items-center justify-center space-x-2 py-3 w-full hover:bg-gray-50 rounded-lg text-gray-600"
                      >
                        <span className="text-xl">💬</span>
                        <span className="font-medium">Comment</span>
                      </button>
                      
                      {/* Share Button */}
                      <button
                        onClick={() => handleShare(post.id)}
                        className="flex items-center justify-center space-x-2 py-3 w-full hover:bg-gray-50 rounded-lg text-gray-600"
                      >
                        <span className="text-xl">🔄</span>
                        <span className="font-medium">Share</span>
                      </button>
                    </div>

                    {/* Comment Input */}
                    {activeCommentPost === post.id && (
                      <div className="p-3 border-t">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {user.avatarInitials}
                          </div>
                          <div className="flex-1 flex space-x-2">
                            <input
                              type="text"
                              placeholder="Write a comment..."
                              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={commentTexts[post.id] || ''}
                              onChange={(e) => handleCommentChange(post.id, e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddComment(post.id);
                                }
                              }}
                            />
                            <button
                              onClick={() => handleAddComment(post.id)}
                              disabled={!commentTexts[post.id]?.trim()}
                              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Comments List */}
                    {post.commentsList && post.commentsList.length > 0 && (
                      <div className="px-4 py-2 border-t">
                        <div className="space-y-3">
                          {post.commentsList.map((comment) => (
                            <div key={comment.id} className="flex items-start space-x-3">
                              <div className="w-7 h-7 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                {comment.avatar}
                              </div>
                              <div className="flex-1">
                                <div className="bg-gray-100 rounded-2xl px-3 py-2">
                                  <div className="flex justify-between items-start">
                                    <div className="font-medium text-sm">{comment.user}</div>
                                    <div className="text-xs text-gray-500">{comment.time}</div>
                                  </div>
                                  <p className="text-sm mt-1">{comment.text}</p>
                                </div>
                                <div className="flex items-center space-x-3 mt-1 ml-2 text-xs text-gray-500">
                                  <button className="hover:text-blue-600">Like</button>
                                  <button className="hover:text-blue-600">Reply</button>
                                  <span>{comment.time}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Desktop Only */}
          <aside className="hidden xl:block w-80 flex-shrink-0">
            <div className="sticky top-20 space-y-4">
              {/* Contacts/Online Friends */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Contacts</h3>
                  <div className="flex space-x-2">
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <span className="text-lg">🎥</span>
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <span className="text-lg">🔍</span>
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <span className="text-lg">⋯</span>
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Alex Kim', avatar: 'AK', status: 'online' },
                    { name: 'Priya Patel', avatar: 'PP', status: 'active' },
                    { name: 'Marcus Lee', avatar: 'ML', status: 'online', typing: true },
                    { name: 'Sophia Chen', avatar: 'SC', status: 'online' },
                    { name: 'David Park', avatar: 'DP', status: 'active' }
                  ].map((contact) => (
                    <div key={contact.name} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {contact.avatar}
                          </div>
                          {contact.status === 'online' && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          {contact.typing ? (
                            <div className="text-xs text-blue-600 italic">typing...</div>
                          ) : (
                            <div className="text-xs text-gray-500">
                              {contact.status === 'online' ? 'Active now' : 'Active 5m ago'}
                            </div>
                          )}
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Message
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group Conversations */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Group Conversations</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Accessibility Advocates', members: 24, unread: 3 },
                    { name: 'Tech & Disability', members: 18, unread: 0 },
                    { name: 'Wheelchair Sports', members: 12, unread: 7 }
                  ].map((group) => (
                    <div key={group.name} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                        👥
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{group.name}</div>
                        <div className="text-xs text-gray-500">{group.members} members</div>
                      </div>
                      {group.unread > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {group.unread}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Birthday Reminders */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Birthdays</h3>
                  <span className="text-yellow-500 text-xl">🎂</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                      MG
                    </div>
                    <div>
                      <div className="font-medium">Maria Garcia</div>
                      <div className="text-xs text-gray-500">Today</div>
                    </div>
                    <button className="ml-auto text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200">
                      Wish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modals */}
      {showShortModal && (
        <CreateShortModal
          onClose={() => setShowShortModal(false)}
          onCreate={() => {
            // Handle short creation
            setShowShortModal(false);
          }}
        />
      )}

      {showProfileModal && (
        <EnhancedProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          user={user}
          onUpdate={(updatedData) => {
            console.log('Profile updated:', updatedData);
            // In real app, update user context/state here
          }}
        />
      )}
    </div>
  );
}
