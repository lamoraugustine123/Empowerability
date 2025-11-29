'use client';

import { useState, useEffect } from 'react';

const milestones = [
  { year: '2020', event: 'Founded with a vision for accessibility', description: 'Started our journey to create inclusive donation platforms.' },
  { year: '2021', event: 'First 100 projects funded', description: 'Reached our first major milestone helping communities.' },
  { year: '2022', event: '$1M in donations processed', description: 'Achieved significant financial impact for accessibility projects.' },
  { year: '2023', event: '10,000+ lives impacted', description: 'Expanded our reach to support more people worldwide.' },
  { year: '2024', event: 'Global partnership network', description: 'Established partnerships with international organizations.' }
];

export default function About() {
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

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Story</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about our journey and commitment to creating a more accessible world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mission Content */}
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                EmpowerAbility was founded on the belief that everyone deserves equal access 
                to opportunities, regardless of their abilities. We're dedicated to breaking 
                down barriers and creating inclusive spaces through the power of community support.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                We connect donors with verified accessibility projects around the world. 
                From building wheelchair ramps to developing assistive technologies, 
                every donation makes a tangible difference in someone's life.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Fund accessibility infrastructure projects</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Support assistive technology development</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Create educational resources</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Build inclusive communities</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Timeline */}
          <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className="flex items-start space-x-6 group cursor-pointer"
                >
                  {/* Year */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {milestone.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {milestone.event}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Connecting Line */}
                  {index < milestones.length - 1 && (
                    <div className="absolute left-10 top-20 w-0.5 h-16 bg-blue-200 transform translate-y-20 -z-10"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Inclusion',
              description: 'We believe in creating spaces where everyone can participate fully and equally.',
              icon: '🌍'
            },
            {
              title: 'Transparency',
              description: 'Every donation is tracked and reported with full visibility for our donors.',
              icon: '🔍'
            },
            {
              title: 'Impact',
              description: 'We measure success by the real-world difference we make in people\'s lives.',
              icon: '💫'
            }
          ].map((value, index) => (
            <div
              key={value.title}
              className="text-center p-6 group hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
