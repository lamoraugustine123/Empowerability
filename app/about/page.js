'use client';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-blue-600">EmpowerAbility</Link>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/about" className="text-blue-600 font-semibold">About</Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
              <Link href="/join" className="text-gray-600 hover:text-gray-900">Join Community</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">About</span>{' '}
                  <span className="block text-blue-600 xl:inline">EmpowerAbility</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Empowering individuals through connection, community, and shared growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To create a platform where individuals can connect, share their journeys, and empower 
                each other to reach their full potential. We believe in the power of community to 
                transform lives and create meaningful change.
              </p>
              <p className="text-lg text-gray-600">
                Through innovative technology and human-centered design, we're building bridges 
                between people from all walks of life, fostering understanding, and creating 
                opportunities for growth and collaboration.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6">
                We envision a world where every individual has access to a supportive community 
                that helps them overcome challenges, celebrate successes, and achieve their dreams.
              </p>
              <p className="text-lg text-gray-600">
                A world where technology serves humanity by creating genuine connections and 
                empowering people to make a positive impact in their communities and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community First</h3>
              <p className="text-gray-600">
                We prioritize the needs of our community above all else. Every feature, every update, 
                and every decision is made with our users' best interests in mind.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously evolve and improve our platform to provide the best possible 
                experience for our users while maintaining simplicity and usability.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trust & Safety</h3>
              <p className="text-gray-600">
                We maintain the highest standards of privacy and security to ensure our community 
                remains a safe space for authentic connections and meaningful conversations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team/Story Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              EmpowerAbility was born from a simple observation: in an increasingly connected world, 
              many people still feel isolated and lack meaningful support systems.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                Founded in 2024, our platform started as a small project to help people connect 
                around shared interests and challenges. What began as a simple idea has grown into 
                a vibrant community of thousands of users supporting each other daily.
              </p>
              <p className="text-gray-600 mb-4">
                We've witnessed incredible stories of transformation - from individuals finding 
                career mentors to people building lifelong friendships across continents.
              </p>
              <p className="text-gray-600">
                Today, we're more committed than ever to our mission of creating spaces where 
                everyone feels seen, heard, and empowered to grow.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Join Our Journey</h3>
              <p className="mb-6">
                Be part of something bigger. Help us build a more connected, empowered world.
              </p>
              <Link 
                href="/join" 
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-gray-400">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100K+</div>
              <div className="text-gray-400">Connections Made</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EmpowerAbility</h3>
              <p className="text-gray-400">
                Connecting people, empowering lives through community and technology.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-gray-400 hover:text-white">Home</Link>
                <Link href="/about" className="block text-gray-400 hover:text-white">About</Link>
                <Link href="/profile" className="block text-gray-400 hover:text-white">Profile</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Community</h4>
              <div className="space-y-2">
                <Link href="/join" className="block text-gray-400 hover:text-white">Join Community</Link>
                <Link href="/login" className="block text-gray-400 hover:text-white">Login</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div>support@empowerability.com</div>
                <div>+1 (555) 123-HELP</div>
                <div>Available 24/7</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EmpowerAbility. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
