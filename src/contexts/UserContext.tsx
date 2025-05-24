import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useWallet } from './WalletContext';

type UserRole = 'freelancer' | 'client' | null;

interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  bio: string;
  skills: string[];
  portfolio: {
    title: string;
    description: string;
    link: string;
  }[];
  rating: number;
  reviewCount: number;
  completedProjects: number;
  joinedDate: string;
}

interface UserContextType {
  currentUser: UserProfile | null;
  isProfileComplete: boolean;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  createProfile: (profile: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  isProfileComplete: false,
  userRole: null,
  setUserRole: () => {},
  updateProfile: () => {},
  createProfile: () => {},
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { address, isConnected } = useWallet();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  
  // Mock function to load user profile - in a real app, this would fetch from API or blockchain
  useEffect(() => {
    const loadUserProfile = async () => {
      if (isConnected && address) {
        // For demo purposes, we'll use local storage to persist user data
        const savedProfile = localStorage.getItem(`user_${address}`);
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setCurrentUser(profile);
          setUserRole(profile.role);
        } else {
          setCurrentUser(null);
          // Check if role is saved
          const savedRole = localStorage.getItem(`role_${address}`);
          setUserRole(savedRole as UserRole);
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
    };

    loadUserProfile();
  }, [isConnected, address]);

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (!isConnected || !address) return;
    
    setCurrentUser(prev => {
      const updatedProfile = { ...prev, ...profile } as UserProfile;
      localStorage.setItem(`user_${address}`, JSON.stringify(updatedProfile));
      return updatedProfile;
    });
  };

  const createProfile = (profile: Partial<UserProfile>) => {
    if (!isConnected || !address || !userRole) return;
    
    const newProfile: UserProfile = {
      id: address,
      role: userRole,
      name: profile.name || '',
      bio: profile.bio || '',
      skills: profile.skills || [],
      portfolio: profile.portfolio || [],
      rating: 0,
      reviewCount: 0,
      completedProjects: 0,
      joinedDate: new Date().toISOString(),
    };
    
    setCurrentUser(newProfile);
    localStorage.setItem(`user_${address}`, JSON.stringify(newProfile));
  };

  const handleSetUserRole = (role: UserRole) => {
    setUserRole(role);
    if (address) {
      localStorage.setItem(`role_${address}`, role || '');
    }
  };

  const isProfileComplete = !!currentUser && !!currentUser.name && !!currentUser.role;

  return (
    <UserContext.Provider 
      value={{ 
        currentUser, 
        isProfileComplete, 
        userRole, 
        setUserRole: handleSetUserRole, 
        updateProfile, 
        createProfile 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};