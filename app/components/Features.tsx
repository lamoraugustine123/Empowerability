'use client';

import { useState, useEffect } from 'react';

const features = [
  {
    icon: '💬',
    title: 'Real-time Chat',
    description: 'Instant messaging with friends and support groups. Share your daily experiences.',
    benefits: ['Private messaging', 'Group chats', 'Voice messages', 'Read receipts']
  },
  {
    icon: '👤',
    title: 'Personal Profiles',
    description: 'Create your unique profile with disability type, interests, and motivational content.',
    benefits: ['Custom profiles', 'Disability tags', 'Achievement badges', 'Story sharing']
  },
  {
    icon: '📱',
    title: 'Status Updates',
    description: 'Share your daily journey, achievements, and motivational moments with the community.',
    benefits: ['24-hour stories', 'Photo updates', 'Video messages', 'Interactive reactions']
  },
  {
    icon: '🎤',
    title: 'Motivational Speeches',
    description: 'Share and listen to inspiring stories from community members.',
    benefits: ['Audio posts', 'Speech sharing', 'Inspiration feed', 'Community spotlight']
  },
  {
    icon: '👥',
    title: 'Support Groups',
    description: 'Join groups based on your specific disability type or interests.',
    benefits: ['Condition-specific groups', 'Interest communities', 'Moderated spaces', 'Expert sessions']
  },
  {
    icon: '🔒',
    title: 'Safe & Accessible',
    description: 'Built with privacy and accessibility at the core for everyone.',
    benefits: ['End-to-end encryption', 'Screen reader optimized', 'High contrast modes', 'Content moderation']
  }
];

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('features');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Connect & Share in <span className="text-green-600">Multiple Ways</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform is designed specifically for the disability community with features 
            that help you connect, share your journey, and find support.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {/* Icon */}
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Benefits List */}
              <ul className="space-y-2">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-500/20 transition-colors duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Join Our Community?
            </h3>
            <p className="text-green-100 text-lg mb-6 max-w-2xl mx-auto">
              Connect with thousands of members who understand your journey and are ready to support you.
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-green-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
              Create Your Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
