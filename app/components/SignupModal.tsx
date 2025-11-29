'use client';

import { useState } from 'react';

const disabilityTypes = [
  { id: 'visual_impairment', name: 'Visual Impairment' },
  { id: 'hearing_impairment', name: 'Hearing Impairment' },
  { id: 'mobility_impairment', name: 'Mobility Impairment' },
  { id: 'cognitive_disability', name: 'Cognitive Disability' },
  { id: 'autism_spectrum', name: 'Autism Spectrum' },
  { id: 'mental_health', name: 'Mental Health Condition' },
  { id: 'speech_impairment', name: 'Speech Impairment' },
  { id: 'multiple_disabilities', name: 'Multiple Disabilities' },
  { id: 'other', name: 'Other Disability' }
];

const educationLevels = [
  { id: 'high_school', name: 'High School' },
  { id: 'some_college', name: 'Some College' },
  { id: 'associate_degree', name: 'Associate Degree' },
  { id: 'bachelor_degree', name: "Bachelor's Degree" },
  { id: 'master_degree', name: "Master's Degree" },
  { id: 'doctorate', name: 'Doctorate' },
  { id: 'other_education', name: 'Other' }
];

const motives = [
  { id: 'find_support', name: 'Find Support and Community' },
  { id: 'share_experience', name: 'Share My Experience' },
  { id: 'make_friends', name: 'Make New Friends' },
  { id: 'get_advice', name: 'Get Advice and Guidance' },
  { id: 'help_others', name: 'Help Others' },
  { id: 'learn_resources', name: 'Learn About Resources' },
  { id: 'advocacy', name: 'Disability Advocacy' },
  { id: 'mental_health_support', name: 'Mental Health Support' }
];

export default function SignupModal({ isOpen, onClose, onSwitchToLogin, onSignupSuccess }: any) {
  const [formData, setFormData] = useState({
  phone: "",
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    disabilityType: '',
    educationLevel: '',
    motive: '',
    bio: '',
    location: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.disabilityType) {
      setError('Please select your disability type');
      return;
    }
    if (!formData.motive) {
      setError('Please tell us your main motivation for joining');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      localStorage.setItem('authToken', 'mock-jwt-token');
      onSignupSuccess({
        displayName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        disabilityType: formData.disabilityType,
        age: formData.age,
        gender: formData.gender,
        educationLevel: formData.educationLevel,
        motive: formData.motive,
        bio: formData.bio,
        location: formData.location,
        fullProfile: true
      });
      onClose();
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Join AbilityConnect</h3>
          <button 
            onClick={onClose}
            style={{ color: '#9ca3af', padding: '0.25rem', borderRadius: '9999px' }}
          >
            <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          Create your detailed profile to connect with the right community members.
        </p>

        {error && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Personal Information */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
                placeholder="Your first name"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
                placeholder="Your last name"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
                placeholder="Your age"
                min="13"
                max="120"
                disabled={isLoading}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Gender
              </label>
              <select 
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  backgroundColor: 'white',
                  fontSize: '1rem'
                }}
                disabled={isLoading}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non_binary">Non-binary</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
                placeholder="+1234567890"
                disabled={isLoading}
              />
            </div>
          </div>
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
                placeholder="+1234567890"
                disabled={isLoading}
              />
            </div>
          </div>
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
                placeholder="your.email@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Username *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
                placeholder="Choose a username"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
                placeholder="Create a password"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Confirm Password *
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
                placeholder="Confirm your password"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Disability & Background */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Disability Type *
            </label>
            <select 
              value={formData.disabilityType}
              onChange={(e) => handleInputChange('disabilityType', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                fontSize: '1rem'
              }}
              required
              disabled={isLoading}
            >
              <option value="">Select your disability type</option>
              {disabilityTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Education Level
              </label>
              <select 
                value={formData.educationLevel}
                onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  backgroundColor: 'white',
                  fontSize: '1rem'
                }}
                disabled={isLoading}
              >
                <option value="">Select education level</option>
                {educationLevels.map(level => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
                placeholder="City, Country"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Motivation */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              What brings you to AbilityConnect? *
            </label>
            <select 
              value={formData.motive}
              onChange={(e) => handleInputChange('motive', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                fontSize: '1rem'
              }}
              required
              disabled={isLoading}
            >
              <option value="">Select your main motivation</option>
              {motives.map(motive => (
                <option key={motive.id} value={motive.id}>
                  {motive.name}
                </option>
              ))}
            </select>
          </div>

          {/* Bio */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Tell us about yourself
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                minHeight: '100px',
                resize: 'vertical'
              }}
              placeholder="Share your story, interests, or what you hope to get from this community..."
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: isLoading ? '#9ca3af' : '#10b981',
              color: 'white',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              marginTop: '1rem'
            }}
          >
            {isLoading ? 'Creating your profile...' : 'Create Complete Profile'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ color: '#6b7280' }}>
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              style={{ color: '#059669', fontWeight: '600' }}
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
