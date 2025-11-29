'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

interface SignupData {
  email: string;
  username: string;
  displayName: string;
  password: string;
  disabilityType: string;
  bio?: string;
  interests: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // In a real app, you'd verify the token with your backend
          // For now, we'll simulate a user
          const mockUser: User = {
            id: '1',
            email: 'user@example.com',
            username: 'user123',
            displayName: 'John Doe',
            disabilityType: 'visual_impairment',
            bio: 'Sharing my journey and motivating others!',
            interests: ['technology', 'accessibility', 'music'],
            isVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        email: email,
        username: 'user123',
        displayName: 'John Doe',
        disabilityType: 'visual_impairment',
        bio: 'Sharing my journey and motivating others!',
        interests: ['technology', 'accessibility', 'music'],
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setUser(mockUser);
      localStorage.setItem('authToken', 'mock-jwt-token');
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      const newUser: User = {
        id: '2',
        email: userData.email,
        username: userData.username,
        displayName: userData.displayName,
        disabilityType: userData.disabilityType,
        bio: userData.bio,
        interests: userData.interests,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setUser(newUser);
      localStorage.setItem('authToken', 'mock-jwt-token');
    } catch (error) {
      throw new Error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
