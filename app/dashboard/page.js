'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';

// Facebook-style components
import FacebookSidebar from './components/FacebookSidebar';
import FacebookStoriesBar from './components/FacebookStoriesBar';
import FacebookCreatePost from './components/FacebookCreatePost';
import FacebookPost from './components/FacebookPost';
import UserProfileModal from './components/UserProfileModal';

// Loading component
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading dashboard...</p>
      </div>
    </div>
  );
}

// Main Dashboard Component
function DashboardContent() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Only run auth check once
    if (authChecked) return;

    const checkAuth = () => {
      console.log('🔐 Checking authentication...');
      
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        console.log('Auth check - Token:', !!token, 'User data:', !!userData);
        
        if (!token || !userData) {
          console.log('❌ No auth data found, redirecting to login');
          // Clear any stale data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
          return;
        }

        const parsedUser = JSON.parse(userData);
        console.log('✅ User authenticated:', parsedUser.name || parsedUser.email);
        setUser(parsedUser);
        
        // Load sample posts
        const samplePosts = [
          {
            id: 1,
            author: 'LAMOR AUGUSTINE',
            authorInitial: 'L',
            authorColor: 'bg-gradient-to-br from-blue-500 to-purple-600',
            isVerified: true,
            content: 'Just launched a new accessibility feature on our platform! Making technology more inclusive, one feature at a time. 🚀 #accessibility #inclusion',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            privacy: 'public',
            likes: 124,
            comments: 23,
            shares: 8,
            isLiked: false,
            isSaved: false,
            image: 'https://via.placeholder.com/600x300/3B82F6/FFFFFF?text=New+Accessibility+Feature',
            commentsList: [
              { id: 1, author: 'Sarah', authorInitial: 'S', content: 'Amazing work! This will help so many people!', time: '2h', likes: 5 },
              { id: 2, author: 'Mike', authorInitial: 'M', content: 'Great initiative! Looking forward to trying it out.', time: '1h', likes: 3 },
            ]
          },
          {
            id: 2,
            author: 'Alex Johnson',
            authorInitial: 'A',
            authorColor: 'bg-gradient-to-br from-green-500 to-blue-500',
            isVerified: false,
            content: 'Had an amazing workshop today about inclusive design. So many insights to implement! 💡',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            privacy: 'friends',
            likes: 89,
            comments: 17,
            shares: 5,
            isLiked: true,
            isSaved: true,
            commentsList: []
          },
          {
            id: 3,
            author: 'Maria Garcia',
            authorInitial: 'M',
            authorColor: 'bg-gradient-to-br from-pink-500 to-red-500',
            isVerified: true,
            content: 'Celebrating one year of our disability support group! So proud of how far we\'ve come together. 🎉 #community #support',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            privacy: 'public',
            likes: 156,
            comments: 34,
            shares: 12,
            isLiked: false,
            isSaved: false,
            image: 'https://via.placeholder.com/600x300/EC4899/FFFFFF?text=Community+Celebration',
            commentsList: [
              { id: 1, author: 'David', authorInitial: 'D', content: 'Congratulations! Your group has been so helpful!', time: '22h', likes: 8 },
            ]
          },
        ];
        
        setPosts(samplePosts);
        setIsLoading(false);
        setAuthChecked(true);
        
      } catch (error) {
        console.error('❌ Error in auth check:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      }
    };

    // Use timeout to ensure we're in browser context
    const timer = setTimeout(checkAuth, 100);
    
    return () => clearTimeout(timer);
  }, [router, authChecked]);

  const handleUserProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Fixed Header */}
        <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md"></div>
                <span className="text-xl font-bold text-gray-900">AbilityConnect</span>
              </div>

              {/* Search */}
              <div className="hidden md:flex flex-1 max-w-2xl mx-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search posts, friends, or groups..."
                    className="w-full bg-gray-100 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                {/* Profile Button */}
                <button 
                  onClick={handleUserProfileClick}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden md:inline font-medium">{user?.name?.split(' ')[0] || 'User'}</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content with Independent Scrollable Sections */}
        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
            {/* Left Sidebar - Independently Scrollable */}
            <div className="lg:col-span-1 h-full">
              <div className="h-full flex flex-col">
                <div className="flex-shrink-0">
                  <FacebookSidebar onUserProfileClick={handleUserProfileClick} />
                </div>
                <div className="flex-1 overflow-y-auto mt-4">
                  {/* Additional sidebar content that scrolls independently */}
                  <div className="space-y-4 pr-2">
                    <div className="bg-white rounded-lg shadow-sm p-4">
                      <h3 className="font-bold text-gray-900 mb-3">Groups</h3>
                      <div className="space-y-2">
                        {['Accessibility Devs', 'Visual Impairment Support', 'Wheelchair Sports', 'Deaf Community'].map((group, idx) => (
                          <div key={idx} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600">👥</span>
                            </div>
                            <span className="text-sm">{group}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-4">
                      <h3 className="font-bold text-gray-900 mb-3">Events</h3>
                      <div className="space-y-2">
                        {['Accessibility Workshop - Tomorrow', 'Community Meetup - Friday', 'Support Group - Sunday'].map((event, idx) => (
                          <div key={idx} className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <div className="font-medium text-sm">{event}</div>
                            <div className="text-xs text-gray-500">Click for details</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Feed - Independently Scrollable */}
            <div className="lg:col-span-2 h-full flex flex-col">
              <div className="flex-shrink-0">
                <FacebookStoriesBar />
                <FacebookCreatePost />
              </div>
              <div className="flex-1 overflow-y-auto mt-4 pr-2">
                {/* Posts - Scroll independently */}
                <div className="space-y-6 pb-6">
                  {posts.map((post) => (
                    <FacebookPost key={post.id} post={post} />
                  ))}
                  
                  {/* Add more sample posts for scrolling */}
                  {[4, 5, 6].map((id) => (
                    <div key={id} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div>
                          <div className="font-bold text-gray-900">Sample User {id}</div>
                          <div className="text-sm text-gray-500">2 days ago</div>
                        </div>
                      </div>
                      <p className="text-gray-800">Sample post content for scrolling demonstration #{id}.</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Independently Scrollable */}
            <div className="lg:col-span-1 h-full">
              <div className="h-full overflow-y-auto pr-2">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg shadow-sm p-4 sticky top-0 z-10">
                    <h3 className="font-bold text-gray-900 mb-4">Sponsored</h3>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                        <div className="font-bold text-blue-600 mb-1">Accessibility Tools</div>
                        <p className="text-sm text-gray-600 mb-2">Check out our new accessibility features</p>
                        <button className="text-sm text-blue-500 hover:text-blue-600">Learn More →</button>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                        <div className="font-bold text-green-600 mb-1">Community Events</div>
                        <p className="text-sm text-gray-600 mb-2">Join our monthly support meetings</p>
                        <button className="text-sm text-green-500 hover:text-green-600">See Events →</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-4">Online Friends</h3>
                    <div className="space-y-3">
                      {['Sarah Johnson', 'Mike Chen', 'Emma Wilson', 'David Brown', 'Lisa Taylor'].map((friend, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-green-600 text-sm">✓</span>
                            </div>
                            <span className="text-sm">{friend}</span>
                          </div>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600">👍</span>
                        </div>
                        <span>Sarah liked your post</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600">💬</span>
                        </div>
                        <span>Mike commented on your photo</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600">👥</span>
                        </div>
                        <span>You joined Accessibility Devs</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-4">Trending Topics</h3>
                    <div className="space-y-2">
                      {['#Accessibility', '#DisabilityRights', '#InclusiveDesign', '#AssistiveTech'].map((topic, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <span className="text-sm text-blue-600">{topic}</span>
                          <span className="text-xs text-gray-500">24 posts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* User Profile Modal */}
      <UserProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
      />
    </>
  );
}

// Main Dashboard Page with Suspense
export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardContent />
    </Suspense>
  );
}
