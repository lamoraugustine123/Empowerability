'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CommunityPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('discover');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    setIsAuthenticated(!!token);
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  // Mock community data
  const communityMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Software Developer',
      location: 'New York, USA',
      interests: ['Technology', 'Career Development', 'Mentoring'],
      connections: 245,
      avatar: '/default-avatar.png',
      isOnline: true
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'UX Designer',
      location: 'San Francisco, USA',
      interests: ['Design', 'Arts & Creativity', 'Personal Growth'],
      connections: 189,
      avatar: '/default-avatar.png',
      isOnline: false
    },
    {
      id: 3,
      name: 'Marcus Rodriguez',
      role: 'Entrepreneur',
      location: 'Miami, USA',
      interests: ['Entrepreneurship', 'Social Impact', 'Technology'],
      connections: 312,
      avatar: '/default-avatar.png',
      isOnline: true
    },
    {
      id: 4,
      name: 'Priya Patel',
      role: 'Data Scientist',
      location: 'London, UK',
      interests: ['Technology', 'Education', 'Health & Wellness'],
      connections: 167,
      avatar: '/default-avatar.png',
      isOnline: true
    },
    {
      id: 5,
      name: 'David Kim',
      role: 'Product Manager',
      location: 'Seoul, South Korea',
      interests: ['Technology', 'Career Development', 'Sports & Fitness'],
      connections: 278,
      avatar: '/default-avatar.png',
      isOnline: false
    },
    {
      id: 6,
      name: 'Emma Wilson',
      role: 'Content Creator',
      location: 'Toronto, Canada',
      interests: ['Arts & Creativity', 'Social Impact', 'Travel & Culture'],
      connections: 194,
      avatar: '/default-avatar.png',
      isOnline: true
    }
  ];

  const communityGroups = [
    {
      id: 1,
      name: 'Tech Innovators',
      members: 1247,
      category: 'Technology',
      description: 'For technology enthusiasts and professionals',
      isPublic: true
    },
    {
      id: 2,
      name: 'Career Growth Hub',
      members: 892,
      category: 'Career Development',
      description: 'Supporting professional development and career advancement',
      isPublic: true
    },
    {
      id: 3,
      name: 'Wellness Warriors',
      members: 567,
      category: 'Health & Wellness',
      description: 'Focus on mental and physical well-being',
      isPublic: true
    },
    {
      id: 4,
      name: 'Creative Minds',
      members: 734,
      category: 'Arts & Creativity',
      description: 'For artists, designers, and creative professionals',
      isPublic: true
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'Alex Johnson',
      action: 'shared a post',
      time: '2 hours ago',
      content: 'Just launched my new open-source project! Excited to share it with the community.'
    },
    {
      id: 2,
      user: 'Sarah Chen',
      action: 'joined the group',
      time: '4 hours ago',
      content: 'Welcome to Creative Minds!'
    },
    {
      id: 3,
      user: 'Marcus Rodriguez',
      action: 'hosted an event',
      time: '1 day ago',
      content: 'Entrepreneurship Workshop this Saturday'
    },
    {
      id: 4,
      user: 'Community',
      action: 'announcement',
      time: '2 days ago',
      content: 'New feature: Direct messaging is now available!'
    }
  ];

  const filteredMembers = communityMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-blue-600">EmpowerAbility</Link>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/community" className="text-blue-600 font-semibold">Community</Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
              {isAuthenticated ? (
                <button 
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/';
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Community Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Community</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Connect with amazing people, share knowledge, and grow together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">{communityMembers.length}+</div>
              <div className="text-sm opacity-90">Active Members</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">{communityGroups.length}+</div>
              <div className="text-sm opacity-90">Interest Groups</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm opacity-90">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search members by name, role, or interests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center">
              <nav className="flex space-x-8">
                {[
                  { id: 'discover', name: 'Discover Members' },
                  { id: 'groups', name: 'Interest Groups' },
                  { id: 'activity', name: 'Recent Activity' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Discover Members Tab */}
        {activeTab === 'discover' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Discover Community Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                        member.isOnline ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-gray-600 text-sm">{member.role}</p>
                      <p className="text-gray-500 text-xs">{member.location}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {member.interests.slice(0, 3).map((interest, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                          {interest}
                        </span>
                      ))}
                      {member.interests.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          +{member.interests.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{member.connections} connections</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Groups Tab */}
        {activeTab === 'groups' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Interest Groups</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityGroups.map((group) => (
                <div key={group.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{group.name}</h3>
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                        {group.category}
                      </span>
                    </div>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                      {group.members} members
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{group.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {group.isPublic ? 'Public Group' : 'Private Group'}
                    </span>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                      Join Group
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Community Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-900">{activity.user}</span>
                        <span className="text-gray-500">{activity.action}</span>
                        <span className="text-gray-400 text-sm">{activity.time}</span>
                      </div>
                      <p className="text-gray-700">{activity.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mt-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl opacity-90 mb-8">
            Connect with like-minded individuals, share your journey, and grow together.
          </p>
          {isAuthenticated ? (
            <Link 
              href="/profile" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg inline-block"
            >
              Complete Your Profile
            </Link>
          ) : (
            <div className="space-x-4">
              <Link 
                href="/join" 
                className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg inline-block"
              >
                Join Now
              </Link>
              <Link 
                href="/login" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg inline-block"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
