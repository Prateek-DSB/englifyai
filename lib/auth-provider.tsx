'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, getCurrentUser, setCurrentUser, clearCurrentUser } from './auth';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = sessionStorage.getItem('englifyai_user');
    return stored ? { username: stored } : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const u = sessionStorage.getItem('englifyai_user');
    if (u) setUser({ username: u });
    setIsLoading(false);
  }, []);

  const login = (user: User) => {
    setUser(user);
    sessionStorage.setItem('englifyai_user', user.username);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('englifyai_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
