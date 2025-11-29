'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      validateToken()
    }
  }, [token])

  useEffect(() => {
    if (password) {
      calculatePasswordStrength(password)
    } else {
      setPasswordStrength(0)
    }
  }, [password])

  const calculatePasswordStrength = (pwd) => {
    let strength = 0
    
    // Length check
    if (pwd.length >= 8) strength += 20
    if (pwd.length >= 12) strength += 10
    
    // Character variety checks
    if (/[A-Z]/.test(pwd)) strength += 20
    if (/[a-z]/.test(pwd)) strength += 20
    if (/[0-9]/.test(pwd)) strength += 20
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 20
    
    // Cap at 100
    setPasswordStrength(Math.min(strength, 100))
  }

  const getStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-red-500'
    if (passwordStrength < 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthText = () => {
    if (passwordStrength === 0) return ''
    if (passwordStrength < 40) return 'Weak'
    if (passwordStrength < 70) return 'Medium'
    return 'Strong'
  }

  const validateToken = async () => {
    try {
      const response = await fetch(`/api/auth/validate-reset-token?token=${token}`)
      const data = await response.json()

      if (response.ok) {
        setIsTokenValid(true)
        setEmail(data.email || '')
      } else {
        setMessage(data.message || 'Invalid or expired reset link')
        setIsError(true)
      }
    } catch (error) {
      setMessage('Error validating reset link')
      setIsError(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    if (!email || !password || !confirmPassword) {
      setMessage('Please fill in all fields')
      setIsError(true)
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      setIsError(true)
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters')
      setIsError(true)
      setIsLoading(false)
      return
    }

    if (passwordStrength < 40) {
      setMessage('Please choose a stronger password')
      setIsError(true)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          email,
          password,
          confirmPassword
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Password reset successfully! Redirecting to login...')
        setIsError(false)
        setPassword('')
        setConfirmPassword('')
        
        setTimeout(() => {
          window.location.href = '/login'
        }, 3000)
      } else {
        setMessage(data.message || 'Error resetting password')
        setIsError(true)
      }
    } catch (error) {
      setMessage('Network error. Please try again.')
      setIsError(true)
    }

    setIsLoading(false)
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Reset Link</h1>
          <p className="text-gray-600 mb-4">This reset link is invalid or has expired.</p>
          <a href="/forgot-password" className="text-blue-600 hover:text-blue-800">
            Request a new reset link
          </a>
        </div>
      </div>
    )
  }

  if (!isTokenValid && !message) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Validating Link...</h1>
          <p className="text-gray-600">Please wait while we validate your reset link.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
          <p className="text-gray-600">Create your new password</p>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-4 ${
            isError 
              ? 'bg-red-50 border border-red-200 text-red-700' 
              : 'bg-green-50 border border-green-200 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              minLength={6}
            />
            
            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Password strength:</span>
                  <span className={`text-xs font-medium ${
                    passwordStrength < 40 ? 'text-red-600' : 
                    passwordStrength < 70 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {getStrengthText()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  <p>Include uppercase, lowercase, numbers, and special characters</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || passwordStrength < 40}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/login" className="text-blue-600 hover:text-blue-800 text-sm">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  )
}
