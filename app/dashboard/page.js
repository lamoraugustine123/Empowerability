'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardStories from "./components/DashboardStories";
import CreateShortModal from './components/CreateShortModal';

export default function Dashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [showShortModal, setShowShortModal] = useState(false);
  const [newPostText, setNewPostText] = useState('');

  // Mock data for Facebook-style posts
  useEffect(() => {
    const samplePosts = [
      {
        id: 1,
        user: {
          name: 'Sarah Johnson',
          avatar: 'SJ',
          role: 'Wheelchair User & Advocate',
          timestamp: '2 hrs ago'
        },
        content: 'Just discovered an amazing accessible coffee shop downtown! Full ramp access, spacious seating, and amazing staff. #AccessibilityWin #WheelchairLife',
        image: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500',
        likes: 24,
        comments: 8,
        shares: 3,
        isLiked: false,
        type: 'post'
      },
      {
        id: 2,
        user: {
          name: 'Mike Chen',
          avatar: 'MC',
          role: 'Visual Impairment Community',
          timestamp: '4 hrs ago'
        },
        content: 'Sharing some great screen reader tips I learned in our support group meeting yesterday. DM me if you want the full notes! #BlindCommunity #TechTips',
        image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=500',
        likes: 31,
        comments: 12,
        shares: 5,
        isLiked: true,
        type: 'post'
      }
    ];

    setPosts(samplePosts);
  }, [user]);

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

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;

    const newPost = {
      id: Date.now(),
      user: {
        name: user?.name || 'You',
        avatar: user?.name?.charAt(0) || 'U',
        role: 'Community Member',
        timestamp: 'Just now'
      },
      content: newPostText,
      image: null,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      type: 'post'
    };

    setPosts(prev => [newPost, ...prev]);
    setNewPostText('');
  };

  const handleCreateShort = (shortData) => {
    const newPost = {
      id: Date.now(),
      user: {
        name: user?.name || 'You',
        avatar: user?.name?.charAt(0) || 'U',
        role: 'Community Member',
        timestamp: 'Just now'
      },
      content: `Check out my new short video: "${shortData.title}"`,
      video: shortData,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      type: 'video'
    };

    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Facebook-style Header */}
      <header className="fixed top-0 sm:px-4 sm:px-4 left-0 right-0 bg-white shadow-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo and Search */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  EA
                </div>
                <h1 className="text-2xl font-bold text-gray-900">EmpowerAbility</h1>
              </div>
              
              <div className="hidden sm:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search EmpowerAbility..."
                    className="w-40 sm:w-64 px-3 sm:px-2 sm:px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-3 top-2 text-gray-500">🔍</span>
                </div>
              </div>
            </div>

            {/* Right: User Menu */}
            <div className="flex items-center space-x-2 sm:space-x-2 sm:space-x-3">
              <button 
                onClick={() => setShowShortModal(true)}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
              >
                <span className="text-lg">🎬</span>
              </button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                <span className="text-lg">💬</span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto pt-16 pb-20 px-2 sm:px-4 lg:pt-20 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left Sidebar */}
          <div className="xl:col-span-3 lg:col-span-4 space-y-4">
            {/* User Profile Card */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user?.name || "User"}</h3>
                  <p className="text-sm text-gray-500">Welcome back!</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {[
                  { icon: "👥", label: "Connections", count: "128" },
                  { icon: "🤝", label: "Support Groups", count: "12" },
                  { icon: "📅", label: "Events", count: "5" },
                  { icon: "⭐", label: "Saved Items", count: "23" },
                  { icon: "📸", label: "Stories Archive", count: "8" }
                ].map((item) => (
                  <button key={item.label} className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: "📝", label: "Create Post", color: "bg-blue-500" },
                  { icon: "🎬", label: "Make a Short", color: "bg-red-500" },
                  { icon: "📅", label: "Create Event", color: "bg-green-500" },
                  { icon: "🤝", label: "Start Group", color: "bg-purple-500" },
                  { icon: "🛍️", label: "Sell Item", color: "bg-orange-500" }
                ].map((action) => (
                  <button key={action.label} className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                    <div className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center text-white`}>
                      <span className="text-lg">{action.icon}</span>
                    </div>
                    <span className="font-medium text-gray-900">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Support Groups */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Your Support Groups</h3>
                <button className="text-blue-500 text-sm font-medium">See All</button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Wheelchair Users", members: "2.4k", icon: "♿", active: true },
                  { name: "Visual Impairment", members: "1.8k", icon: "👁️", active: false },
                  { name: "Autism Parents", members: "3.2k", icon: "🧩", active: true },
                  { name: "Deaf Community", members: "1.5k", icon: "👂", active: false },
                  { name: "Chronic Pain", members: "2.1k", icon: "💊", active: true }
                ].map((group) => (
                  <button key={group.name} className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="relative">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <span className="text-lg">{group.icon}</span>
                      </div>
                      {group.active && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">{group.name}</p>
                      <p className="text-xs text-gray-500">{group.members} members</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Events */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
                <button className="text-blue-500 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-3">
                {[
                  { title: "Accessibility Workshop", date: "Today, 2:00 PM", attendees: "24 going", icon: "🎓" },
                  { title: "Virtual Support Meet", date: "Tomorrow, 6:00 PM", attendees: "18 going", icon: "💻" },
                  { title: "Community Picnic", date: "Sat, 12:00 PM", attendees: "42 going", icon: "🌳" }
                ].map((event, index) => (
                  <div key={index} className="p-3 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <span className="text-lg">{event.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.date}</p>
                        <p className="text-xs text-blue-500 mt-1">{event.attendees}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources & Tools */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Resources & Tools</h3>
              <div className="space-y-2">
                {[
                  { icon: "📚", label: "Learning Center", desc: "Educational resources" },
                  { icon: "🛠️", label: "Accessibility Tools", desc: "Helpful utilities" },
                  { icon: "📋", label: "Advocacy Guides", desc: "Make your voice heard" },
                  { icon: "🏥", label: "Healthcare Resources", desc: "Medical support" }
                ].map((resource) => (
                  <button key={resource.label} className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                      <span className="text-lg">{resource.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{resource.label}</p>
                      <p className="text-xs text-gray-500">{resource.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="xl:col-span-6 lg:col-span-8 space-y-4">
            {/* Create Post Card */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-2 sm:space-x-2 sm:space-x-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="flex-1 bg-gray-100 rounded-full px-2 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-between border-t pt-3">
                {[
                  { icon: '🎬', label: 'Short Video', action: () => setShowShortModal(true) },
                  { icon: '🖼️', label: 'Photo/Video' },
                  { icon: '😊', label: 'Feeling/Activity' }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="flex items-center space-x-2 px-2 sm:px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-600"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stories */}
            <DashboardStories />

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm">
                  {/* Post Header */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {post.user.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{post.user.name}</h4>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <span>{post.user.timestamp}</span>
                            <span>•</span>
                            <span>{post.user.role}</span>
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        <span className="text-xl">⋯</span>
                      </button>
                    </div>
                    
                    {/* Post Content */}
                    <div className="mt-3">
                      <p className="text-gray-900">{post.content}</p>
                    </div>
                  </div>

                  {/* Post Image/Video */}
                  {post.image && (
                    <div className="w-full">
                      <img 
                        src={post.image} 
                        alt="Post content"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  {/* Post Stats */}
                  <div className="px-2 sm:px-4 py-2 border-t border-b text-sm text-gray-500 flex justify-between">
                    <span>{post.likes} likes</span>
                    <div className="flex space-x-4">
                      <span>{post.comments} comments</span>
                      <span>{post.shares} shares</span>
                    </div>
                  </div>

                  {/* Post Actions */}
                  <div className="p-2">
                    <div className="flex justify-around">
                      {[
                        { icon: '👍', label: 'Like', action: () => handleLike(post.id), active: post.isLiked },
                        { icon: '💬', label: 'Comment' },
                        { icon: '🔄', label: 'Share' }
                      ].map((action) => (
                        <button
                          key={action.label}
                          onClick={action.action}
                          className={`flex items-center space-x-2 px-2 sm:px-2 sm:px-4 py-2 rounded-lg flex-1 text-sm sm:text-base justify-center mx-1 ${
                            action.active 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <span className="text-lg">{action.icon}</span>
                          <span className="font-medium">{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="xl:col-span-3 lg:col-span-4 hidden lg:block space-y-4">
            {/* Online Connections */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Online Connections</h3>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Alex Kim', avatar: 'AK' },
                  { name: 'Priya Patel', avatar: 'PP' }
                ].map((connection) => (
                  <div key={connection.name} className="flex items-center space-x-2 sm:space-x-2 sm:space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {connection.avatar}
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{connection.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Short Video Modal */}
      {showShortModal && (
        <CreateShortModal
          onClose={() => setShowShortModal(false)}
          onCreate={handleCreateShort}
        />
      )}
    </div>
  );
}
