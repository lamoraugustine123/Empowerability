'use client';

import { useState } from 'react';

export default function ForgotPasswordModal({ isOpen, onClose, onSwitchToLogin }: any) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resetLink, setResetLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔄 Form submitted with email:', email);
    
    setIsLoading(true);
    setError('');
    
    try {
      console.log('📡 Calling API...');
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('📨 API Response status:', response.status);
      
      let data;
      try {
        data = await response.json();
        console.log('📨 API Response data:', data);
      } catch (jsonError) {
        console.error('❌ Failed to parse JSON response:', jsonError);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      // Store reset link for development display
      if (data.resetLink) {
        setResetLink(data.resetLink);
        console.log('🔗 Reset link received:', data.resetLink);
      }
      
      setSuccess(true);
      console.log('✅ Success state set to true');
    } catch (err) {
      console.error('❌ API Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEmail('');
    setSuccess(false);
    setError('');
    setResetLink('');
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
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
            {success ? 'Check Your Email' : 'Reset Your Password'}
          </h3>
          <button 
            onClick={onClose}
            style={{ color: '#9ca3af', padding: '0.25rem', borderRadius: '9999px' }}
            disabled={isLoading}
          >
            <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!success ? (
          <>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>

            {error && (
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                  placeholder="Enter your email address"
                  required
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
                  marginTop: '0.5rem'
                }}
              >
                {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <p style={{ color: '#6b7280' }}>
                Remember your password?{' '}
                <button
                  onClick={onSwitchToLogin}
                  style={{ color: '#059669', fontWeight: '600' }}
                  disabled={isLoading}
                >
                  Back to Login
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                Reset Link Sent!
              </h4>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                We've sent a password reset link to:<br />
                <strong style={{ color: '#1f2937' }}>{email}</strong>
              </p>
              
              {/* Development mode: Show actual reset link */}
              {resetLink && (
                <div style={{ 
                  backgroundColor: '#f0fdf4', 
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px',
                  padding: '1rem',
                  margin: '1rem 0',
                  textAlign: 'left'
                }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500', color: '#065f46' }}>
                    🛠️ Development Mode:
                  </p>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#047857' }}>
                    Email preview URL (check terminal for actual reset link):
                  </p>
                  <a 
                    href={resetLink}
                    style={{ 
                      fontSize: '0.75rem', 
                      color: '#059669',
                      wordBreak: 'break-all',
                      textDecoration: 'underline'
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resetLink}
                  </a>
                </div>
              )}
              
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Check your inbox and click the link to reset your password. The link will expire in 1 hour.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleReset}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  border: '1px solid #d1d5db'
                }}
              >
                Send to Another Email
              </button>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600'
                }}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
