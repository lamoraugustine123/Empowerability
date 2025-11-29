export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  disabilityType: string;
  bio?: string;
  profilePicture?: string;
  interests: string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  bio: string;
  location?: string;
  website?: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  achievements: string[];
  motivationalSpeaker: boolean;
  speakingTopics: string[];
}

export interface DisabilityType {
  id: string;
  name: string;
  description: string;
  category: string;
}
