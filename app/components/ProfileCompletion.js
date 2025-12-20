'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileCompletion({ user }) {
  const [completion, setCompletion] = useState({
    percentage: 0,
    completed: [],
    pending: [],
  });

  const router = useRouter();

  useEffect(() => {
    calculateCompletion();
  }, [user]);

  const calculateCompletion = () => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const steps = [
      { id: 'profile_picture', label: 'Add profile picture', weight: 20, check: () => userData.profilePhoto },
      { id: 'cover_photo', label: 'Add cover photo', weight: 10, check: () => userData.coverPhoto },
      { id: 'bio', label: 'Write a bio', weight: 15, check: () => userData.bio && userData.bio.length > 20 },
      { id: 'location', label: 'Add location', weight: 10, check: () => userData.location },
      { id: 'website', label: 'Add website', weight: 5, check: () => userData.website },
      { id: 'pronouns', label: 'Add pronouns', weight: 5, check: () => userData.pronouns },
      { id: 'friends', label: 'Add 5+ friends', weight: 15, check: () => true }, // Placeholder
      { id: 'posts', label: 'Create first post', weight: 10, check: () => true }, // Placeholder
      { id: 'groups', label: 'Join 3+ groups', weight: 5, check: () => true }, // Placeholder
      { id: 'verification', label: 'Get verified', weight: 5, check: () => userData.verificationStatus?.status === 'verified' },
    ];

    let totalWeight = 0;
    let completedWeight = 0;
    const completed = [];
    const pending = [];

    steps.forEach(step => {
      totalWeight += step.weight;
      if (step.check()) {
        completedWeight += step.weight;
        completed.push(step);
      } else {
        pending.push(step);
      }
    });

    const percentage = Math.round((completedWeight / totalWeight) * 100);

    setCompletion({
      percentage,
      completed,
      pending,
    });
  };

  const handleCompleteStep = (step) => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    switch(step.id) {
      case 'profile_picture':
        alert('Navigate to profile picture upload');
        break;
      case 'cover_photo':
        alert('Navigate to cover photo upload');
        break;
      case 'bio':
        // Trigger bio editing in parent
        const bio = prompt('Enter your bio (minimum 20 characters):');
        if (bio && bio.length >= 20) {
          userData.bio = bio;
          localStorage.setItem('user', JSON.stringify(userData));
          calculateCompletion();
        }
        break;
      case 'location':
        const location = prompt('Enter your location (City, Country):');
        if (location) {
          userData.location = location;
          localStorage.setItem('user', JSON.stringify(userData));
          calculateCompletion();
        }
        break;
      case 'website':
        const website = prompt('Enter your website URL:');
        if (website) {
          userData.website = website;
          localStorage.setItem('user', JSON.stringify(userData));
          calculateCompletion();
        }
        break;
      case 'pronouns':
        const pronouns = prompt('Enter your pronouns (e.g., he/him, she/her, they/them):');
        if (pronouns) {
          userData.pronouns = pronouns;
          localStorage.setItem('user', JSON.stringify(userData));
          calculateCompletion();
        }
        break;
      default:
        alert(`Complete: ${step.label}`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Profile Completion</h3>
        <div className="text-2xl font-bold text-blue-600">
          {completion.percentage}%
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Complete your profile to unlock features</span>
          <span>{completion.percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${completion.percentage}%` }}
          />
        </div>
      </div>

      {/* Completion Benefits */}
      {completion.percentage < 100 && (
        <div className="mb-6 p-4 bg-white rounded-lg border">
          <h4 className="font-medium mb-2">Complete your profile to unlock:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <span className="mr-2 text-green-600">✓</span>
              <span>Higher search ranking</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-green-600">✓</span>
              <span>More connection requests</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-green-600">✓</span>
              <span>Profile badge</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-green-600">✓</span>
              <span>Priority support</span>
            </div>
          </div>
        </div>
      )}

      {/* Pending Steps */}
      {completion.pending.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Next steps to complete:</h4>
          <div className="space-y-2">
            {completion.pending.slice(0, 3).map(step => (
              <div 
                key={step.id}
                className="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleCompleteStep(step)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600">+</span>
                  </div>
                  <div>
                    <div className="font-medium">{step.label}</div>
                    <div className="text-xs text-gray-500">{step.weight}% of profile</div>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  Complete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Steps */}
      {completion.completed.length > 0 && completion.percentage < 100 && (
        <div className="mt-4">
          <h4 className="font-medium mb-3">Completed ({completion.completed.length})</h4>
          <div className="grid grid-cols-2 gap-2">
            {completion.completed.slice(0, 4).map(step => (
              <div 
                key={step.id}
                className="p-2 bg-green-50 rounded-lg flex items-center space-x-2"
              >
                <span className="text-green-600">✓</span>
                <span className="text-sm">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {completion.percentage === 100 && (
        <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h4 className="font-bold text-green-800 mb-1">Profile Complete!</h4>
          <p className="text-sm text-green-700">
            Your profile is 100% complete. You now have access to all features.
          </p>
        </div>
      )}
    </div>
  );
}
