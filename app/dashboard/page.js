'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';

// Facebook-style components
import FacebookSidebar from './components/FacebookSidebar';
import FacebookStoriesBar from './components/FacebookStoriesBar';
import FacebookCreatePost from './components/FacebookCreatePost';
import FacebookPost from './components/FacebookPost';
import UserProfileModal from './components/UserProfileModal';
import ProfileButton from '../components/ProfileButton';

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
    if (authChecked) return;

    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (!token || !userData) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
          return;
        }

        const parsedUser = JSON.parse(userData);
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
          {
            id: 4,
            author: 'John Doe',
            authorInitial: 'J',
            authorColor: 'bg-gradient-to-br from-yellow-500 to-orange-500',
            isVerified: false,
            content: 'Just completed my first month using assistive technology. Life changing! #disabilitytech #accessibility',
            timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
            privacy: 'public',
            likes: 78,
            comments: 12,
            shares: 3,
            isLiked: false,
            isSaved: false,
            commentsList: []
          },
          {
            id: 5,
            author: 'Sarah Wilson',
            authorInitial: 'S',
            authorColor: 'bg-gradient-to-br from-teal-500 to-blue-500',
            isVerified: true,
            content: 'Sharing my journey with visual impairment and how technology has helped me stay connected. #visualimpairment #tech',
            timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
            privacy: 'public',
            likes: 203,
            comments: 45,
            shares: 18,
            isLiked: true,
            isSaved: true,
            commentsList: [
              { id: 1, author: 'Mike', authorInitial: 'M', content: 'Thank you for sharing your story!', time: '2d', likes: 12 },
            ]
          },
          {
            id: 6,
            author: 'Robert Chen',
            authorInitial: 'R',
            authorColor: 'bg-gradient-to-br from-indigo-500 to-purple-500',
            isVerified: false,
            content: 'Looking for recommendations for wheelchair-accessible travel destinations in Europe. Any suggestions? #travel #accessibility',
            timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
            privacy: 'public',
            likes: 67,
            comments: 28,
            shares: 7,
            isLiked: false,
            isSaved: false,
            commentsList: []
          },
          {
            id: 7,
            author: 'Emma Davis',
            authorInitial: 'E',
            authorColor: 'bg-gradient-to-br from-red-500 to-pink-500',
            isVerified: true,
            content: 'Our community fundraiser for accessibility devices reached its goal! Thank you everyone for your support. ❤️ #fundraiser #community',
            timestamp: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(),
            privacy: 'public',
            likes: 312,
            comments: 67,
            shares: 42,
            isLiked: false,
            isSaved: false,
            image: 'https://via.placeholder.com/600x300/EF4444/FFFFFF?text=Fundraiser+Success',
            commentsList: []
          },
          {
            id: 8,
            author: 'Michael Brown',
            authorInitial: 'M',
            authorColor: 'bg-gradient-to-br from-purple-500 to-indigo-500',
            isVerified: false,
            content: 'Started learning sign language today. Any tips for beginners? #signlanguage #learning',
            timestamp: new Date(Date.now() - 144 * 60 * 60 * 1000).toISOString(),
            privacy: 'public',
            likes: 89,
            comments: 34,
            shares: 9,
            isLiked: true,
            isSaved: false,
            commentsList: []
          },
          // ADDING MORE POSTS FOR MORE SCROLLING
          {
            id: 9,
            author: 'Lisa Wong',
            authorInitial: 'L',
            authorColor: 'bg-gradient-to-br from-blue-500 to-green-500',
            isVerified: true,
            content: 'New wheelchair ramp installed at the community center! So excited about this accessibility improvement. ♿ #accessibilitymatters',
            timestamp: new Date(Date.now() - 168 * 60 * 60 * 1000).toISOString(),
            privacy: 'public',
            likes: 145,
            comments: 32,
            shares: 15,
            isLiked: false,
            isSaved: false,
            image: 'https://via.placeholder.com/600x300/10B981/FFFFFF?text=Wheelchair+Ramp',
            commentsList: []
          },
          {
            id: 10,
            author: 'Tom Harris',
            authorInitial: 'T',
            authorColor: 'bg-gradient-to-br from-orange-500 to-red-500',
            isVerified: false,
            content: 'Just got my new hearing aids and they\'re life-changing! So grateful for modern technology. 👂 #hearingaids #tech',
            timestamp: new Date(Date.now() - 192 * 60 * 60 * 1000).toISOString(),
            privacy: 'public',
            likes: 98,
            comments: 25,
            shares: 6,
            isLiked: true,
            isSaved: true,
            commentsList: []
          },
          {
            id: 11,
            author: 'Anna Smith',
            authorInitial: 'A',
            authorColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
            isVerified: false,
            content: 'Today I gave my first presentation using speech-to-text technology! Nervous but excited about the progress. 🎤 #speechtotext #inclusion',
            timestamp: new Date(Date.now() - 200 * 60 * 60 * 1000).toISOString(),
            privacy: 'public',
            likes: 76,
            comments: 14,
            shares: 3,
            isLiked: false,
            isSaved: false,
            commentsList: []
          },
          {
            id: 12,
            author: 'Chris Lee',
            authorInitial: 'C',
            authorColor: 'bg-gradient-to-br from-blue-500 to-indigo-500',
            isVerified: true,
            content: 'Our team just released an open-source screen reader plugin! Free for all developers. #opensource #accessibility #dev',
            timestamp: new Date(Date.now() - 216 * 60 * 60 * 1000).toISOString(),
            privacy: 'public',
            likes: 189,
            comments: 42,
            shares: 28,
            isLiked: true,
            isSaved: true,
            image: 'https://via.placeholder.com/600x300/4F46E5/FFFFFF?text=Open+Source+Tool',
            commentsList: []
          },
          {
            id: 13,
            author: 'Sophia Patel',
            authorInitial: 'S',
            authorColor: 'bg-gradient-to-br from-red-500 to-orange-500',
            isVerified: false,
            content: 'Just completed my wheelchair basketball tournament! What an amazing experience with an incredible community. 🏀 #wheelchairbasketball #sports',
            timestamp: new Date(Date.now() - 240 * 60 * 60 * 1000).toISOString(),
            privacy: 'public',
            likes: 234,
            comments: 56,
            shares: 34,
            isLiked: false,
            isSaved: false,
            image: 'https://via.placeholder.com/600x300/F97316/FFFFFF?text=Wheelchair+Basketball',
            commentsList: []
          },
          {
            id: 14,
            author: 'David Kim',
            authorInitial: 'D',
            authorColor: 'bg-gradient-to-br from-green-500 to-emerald-500',
            isVerified: true,
            content: 'New braille display technology just got 50% more affordable thanks to community grants! #braille #technology #affordable',
            timestamp: new Date(Date.now() - 264 * 60 * 60 * 1000).toISOString(),
            privacy: 'public',
            likes: 167,
            comments: 38,
            shares: 19,
            isLiked: false,
            isSaved: false,
            commentsList: []
          },
          {
            id: 15,
            author: 'Olivia Garcia',
            authorInitial: 'O',
            authorColor: 'bg-gradient-to-br from-pink-500 to-rose-500',
            isVerified: false,
            content: 'Teaching my service dog new commands this week! So proud of how far we\'ve come together. 🐕 #servicedog #training #disability',
            timestamp: new Date(Date.now() - 288 * 60 * 60 * 1000).toISOString(),
            privacy: 'public',
            likes: 142,
            comments: 31,
            shares: 12,
            isLiked: true,
            isSaved: false,
            image: 'https://via.placeholder.com/600x300/F43F5E/FFFFFF?text=Service+Dog+Training',
            commentsList: []
          },
        ];
        
        setPosts(samplePosts);
        setIsLoading(false);
        setAuthChecked(true);
        
      } catch (error) {
        console.error('❌ Error in auth check:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      }
    };

    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [router, authChecked]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Fixed Header - NEVER SCROLLS */}
        <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md"></div>
                <span className="text-xl font-bold text-gray-900">AbilityConnect</span>
              </div>

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

              <div className="flex items-center space-x-4">
                <ProfileButton user={user} />
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT AREA - NO OVERFLOW PROPERTIES HERE */}
        <div className="container mx-auto px-4 py-6">
          {/* THREE INDEPENDENT SCROLL CONTAINERS */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* COLUMN 1: LEFT SIDEBAR - INDEPENDENT SCROLL CONTAINER */}
            <div className="lg:col-span-1">
              {/* SCROLL CONTAINER WITH FIXED HEIGHT */}
              <div className="h-[calc(100vh-120px)] overflow-y-auto dashboard-scroll-container">
                {/* Fixed top part */}
                <div className="mb-4">
                  <FacebookSidebar />
                </div>
                
                {/* Scrollable content */}
                <div className="space-y-4 pb-8">
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-3">Groups (8)</h3>
                    <div className="space-y-2">
                      {['Accessibility Devs', 'Visual Impairment Support', 'Wheelchair Sports', 'Deaf Community', 'Autism Support Network', 'Mental Health Allies', 'Caregiver Support', 'Tech Accessibility'].map((group, idx) => (
                        <div key={idx} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600">👥</span>
                          </div>
                          <span className="text-sm">{group}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                      See all 12 groups →
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-3">Events (7)</h3>
                    <div className="space-y-2">
                      {['Accessibility Workshop - Tomorrow', 'Community Meetup - Friday', 'Support Group - Sunday', 'Tech Talk - Next Week', 'Social Mixer - Monthly', 'Yoga for Disabilities - Daily', 'Career Fair - Next Month'].map((event, idx) => (
                        <div key={idx} className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <div className="font-medium text-sm">{event}</div>
                          <div className="text-xs text-gray-500">Click for details</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                      Create event +
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-3">Memories (6)</h3>
                    <div className="space-y-2">
                      {['1 year ago: Joined AbilityConnect', '6 months ago: First post', '3 months ago: Reached 100 friends', '2 months ago: Started support group', '1 month ago: Helped organize event', '2 weeks ago: Featured in newsletter'].map((memory, idx) => (
                        <div key={idx} className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <div className="text-sm">{memory}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                      See more memories →
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-3">Saved Items (8)</h3>
                    <div className="space-y-2">
                      {['Accessibility Guide.pdf', 'Event Calendar', 'Resource List', 'Contact Directory', 'Workshop Slides', 'Accessibility Checklist', 'Volunteer Schedule', 'Grant Opportunities'].map((item, idx) => (
                        <div key={idx} className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <div className="text-sm">{item}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                      View all saved →
                    </div>
                  </div>
                  
                  {/* Additional section for more scroll */}
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-3">Shortcuts (6)</h3>
                    <div className="space-y-2">
                      {['Live Videos', 'Marketplace', 'Gaming', 'Fundraisers', 'Climate Center', 'Weather'].map((shortcut, idx) => (
                        <div key={idx} className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <div className="text-sm">{shortcut}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: MIDDLE FEED - INDEPENDENT SCROLL CONTAINER */}
            {/* FIXED: Simple container with overflow-y-auto */}
            <div className="lg:col-span-2">
              {/* SIMPLE SCROLL CONTAINER - NO FLEX, NO FLEX-COL */}
              <div className="h-[calc(100vh-120px)] overflow-y-auto dashboard-scroll-container">
                {/* Fixed top part */}
                <div className="space-y-4 mb-4">
                  <FacebookStoriesBar />
                  <FacebookCreatePost />
                </div>
                
                {/* Scrollable content - SIMPLE DIV */}
                <div className="space-y-6 pb-8">
                  {posts.map((post) => (
                    <FacebookPost key={post.id} post={post} />
                  ))}
                  
                  {/* Loading indicator at bottom */}
                  <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-sm text-gray-500">Loading more posts...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 3: RIGHT SIDEBAR - INDEPENDENT SCROLL CONTAINER */}
            <div className="lg:col-span-1">
              {/* SCROLL CONTAINER WITH FIXED HEIGHT */}
              <div className="h-[calc(100vh-120px)] overflow-y-auto dashboard-scroll-container">
                <div className="space-y-4 pb-8">
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-4">Sponsored (3)</h3>
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
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
                        <div className="font-bold text-orange-600 mb-1">Volunteer Opportunities</div>
                        <p className="text-sm text-gray-600 mb-2">Help make a difference in your community</p>
                        <button className="text-sm text-orange-500 hover:text-orange-600">Sign Up →</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-4">Online Friends (15)</h3>
                    <div className="space-y-3">
                      {['Sarah Johnson', 'Mike Chen', 'Emma Wilson', 'David Brown', 'Lisa Taylor', 'Alex Garcia', 'Maria Rodriguez', 'James Wilson', 'Sophia Lee', 'Thomas Kim', 'Kevin Martin', 'Olivia Davis', 'Brian Clark', 'Rachel White', 'Daniel Moore'].map((friend, idx) => (
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
                    <div className="mt-3 text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                      See all friends →
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-4">Recent Activity (10)</h3>
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
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-yellow-600">🎂</span>
                        </div>
                        <span>It\'s Emma\'s birthday today</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600">📅</span>
                        </div>
                        <span>Event reminder: Workshop tomorrow</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                          <span className="text-pink-600">📸</span>
                        </div>
                        <span>Lisa posted a new photo</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600">🎥</span>
                        </div>
                        <span>David went live</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                          <span className="text-teal-600">📝</span>
                        </div>
                        <span>You updated your profile</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center">
                          <span className="text-rose-600">❤️</span>
                        </div>
                        <span>Maria reacted to your story</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-amber-600">🏆</span>
                        </div>
                        <span>You earned a new badge</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-4">Trending Topics (10)</h3>
                    <div className="space-y-2">
                      {['#Accessibility', '#DisabilityRights', '#InclusiveDesign', '#AssistiveTech', '#Community', '#Support', '#MentalHealth', '#Caregivers', '#AccessibleTravel', '#DeafCulture'].map((topic, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <span className="text-sm text-blue-600">{topic}</span>
                          <span className="text-xs text-gray-500">{Math.floor(Math.random() * 100 + 50)} posts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-4">Birthdays (8)</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <span className="text-pink-600">🎂</span>
                          </div>
                          <span className="text-sm">Emma Wilson</span>
                        </div>
                        <span className="text-xs text-gray-500">Today</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <span className="text-pink-600">🎂</span>
                          </div>
                          <span className="text-sm">Alex Garcia</span>
                        </div>
                        <span className="text-xs text-gray-500">Tomorrow</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <span className="text-pink-600">🎂</span>
                          </div>
                          <span className="text-sm">Lisa Taylor</span>
                        </div>
                        <span className="text-xs text-gray-500">In 3 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <span className="text-pink-600">🎂</span>
                          </div>
                          <span className="text-sm">Michael Brown</span>
                        </div>
                        <span className="text-xs text-gray-500">In 5 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <span className="text-pink-600">🎂</span>
                          </div>
                          <span className="text-sm">Sarah Johnson</span>
                        </div>
                        <span className="text-xs text-gray-500">In 1 week</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <span className="text-pink-600">🎂</span>
                          </div>
                          <span className="text-sm">David Miller</span>
                        </div>
                        <span className="text-xs text-gray-500">In 10 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <span className="text-pink-600">🎂</span>
                          </div>
                          <span className="text-sm">Olivia Davis</span>
                        </div>
                        <span className="text-xs text-gray-500">In 2 weeks</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <span className="text-pink-600">🎂</span>
                          </div>
                          <span className="text-sm">Brian Clark</span>
                        </div>
                        <span className="text-xs text-gray-500">In 3 weeks</span>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                      See all birthdays →
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-4">Quick Links (8)</h3>
                    <div className="space-y-2">
                      {['Help Center', 'Accessibility Settings', 'Privacy Checkup', 'Report a Problem', 'Suggest a Feature', 'Terms of Service', 'Community Guidelines', 'Cookie Policy'].map((link, idx) => (
                        <div key={idx} className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <div className="text-sm">{link}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Additional section for more scroll */}
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-4">Suggested Groups (6)</h3>
                    <div className="space-y-2">
                      {['Accessible Travel Enthusiasts', 'Disability Tech Innovators', 'Mental Health Support', 'Caregiver Network', 'Deaf and Hard of Hearing', 'Visual Impairment Tech'].map((group, idx) => (
                        <div key={idx} className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <div className="text-sm">{group}</div>
                          <div className="text-xs text-gray-500">Join group</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
